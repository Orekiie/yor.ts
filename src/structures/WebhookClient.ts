import { WebhooksAPI } from '@discordjs/core/http-only';
import { REST } from '@discordjs/rest';

import { YorClientError } from './YorClientError';

export type WebhookClientOptions<
  T extends string | { id: string; token: string },
> = T;

export class WebhookClient<T extends string | { id: string; token: string }> {
  public readonly id: string;
  public readonly token: string;

  private API: WebhooksAPI;

  public constructor(options: WebhookClientOptions<T>) {
    this.API = new WebhooksAPI(new REST({ version: '10' }));

    const id =
      typeof options === 'string'
        ? options.split('/')[options.split('/').length - 2]
        : options.id;

    if (!id) {
      throw new YorClientError('Webhook ID is required');
    }

    const token =
      typeof options === 'string' ? options.split('/').pop() : options.token;

    if (!token) {
      throw new YorClientError('Webhook Token is required');
    }

    this.id = id;
    this.token = token;
  }

  /**
   * Sends the provided data using the API's `execute` method.
   *
   * @param {Parameters<typeof this.API.execute>[2]} data - The data to be sent.
   * @return {Promise<void>} A promise that resolves to the result of the `execute` method.
   */
  public async send(
    data: Parameters<typeof this.API.execute>[2],
  ): Promise<void> {
    return this.API.execute(this.id, this.token, data);
  }
}
