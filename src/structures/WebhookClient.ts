import {
  APIMessage,
  APIWebhook,
  RESTGetAPIWebhookWithTokenMessageQuery,
  RESTPatchAPIWebhookJSONBody,
  RESTPostAPIWebhookWithTokenJSONBody,
  RESTPostAPIWebhookWithTokenQuery,
  WebhooksAPI,
} from '@discordjs/core/http-only';
import { REST, RawFile } from '@discordjs/rest';

import { YorClientError } from './YorClientError';

export type WebhookClientOptions<
  T extends string | { id: string; token: string },
> = T;

export class WebhookClient<T extends string | { id: string; token: string }> {
  public readonly id: string;
  public readonly token: string;

  private API: WebhooksAPI;

  /**
   * Creates a new WebhookClient instance.
   *
   * @param {WebhookClientOptions<T>} options - The options for the WebhookClient.
   */
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
   * Edits the webhook with the provided data.
   *
   * @param {RESTPatchAPIWebhookJSONBody & { reason: string }} data - The data to edit the webhook with, including the reason.
   * @return {Promise<APIWebhook>} A promise that resolves to the edited webhook.
   */
  public async edit({
    reason,
    ...data
  }: RESTPatchAPIWebhookJSONBody & { reason: string }): Promise<APIWebhook> {
    return this.API.edit(this.id, data, { token: this.token, reason });
  }

  /**
   * Deletes the resource with the given reason.
   *
   * @param {string} reason - The reason for deleting the resource.
   * @return {Promise<void>} A promise that resolves with the result of the deletion operation.
   */
  public async delete(reason: string) {
    return this.API.delete(this.id, { token: this.token, reason });
  }

  /**
   * Sends the provided data using the API's `execute` method.
   *
   * @param {RESTPostAPIWebhookWithTokenJSONBody & RESTPostAPIWebhookWithTokenQuery & { files?: RawFile[] | undefined; wait: true; }} data - The data to be sent.
   * @return {Promise<APIMessage>} A promise that resolves to the result of the `execute` method.
   */
  public async send(
    data: RESTPostAPIWebhookWithTokenJSONBody &
      RESTPostAPIWebhookWithTokenQuery & {
        files?: RawFile[] | undefined;
        wait: true;
      },
  ): Promise<APIMessage> {
    return this.API.execute(this.id, this.token, data);
  }

  /**
   * Edits a previously sent webhook message.
   *
   * @param {string} messageId - The ID of the message to edit.
   * @param {RESTPatchAPIWebhookWithTokenJSONBody & RESTPostAPIWebhookWithTokenQuery & { files?: RawFile[] | undefined; }} data - The new data for the message.
   * @return {Promise<APIMessage>} A promise that resolves to the edited message.
   */
  public async editMessage(
    messageId: string,
    data: RESTPostAPIWebhookWithTokenJSONBody &
      RESTPostAPIWebhookWithTokenQuery & {
        files?: RawFile[] | undefined;
      },
  ): Promise<APIMessage> {
    return this.API.editMessage(this.id, this.token, messageId, data);
  }

  /**
   * Deletes a webhook message.
   *
   * @param {string} messageId - The ID of the message to delete.
   * @param {{ thread_id: string }} [options] - The query parameters to send with the request.
   * @return {Promise<void>} A promise that resolves once the message is deleted.
   */
  public async deleteMessage(
    messageId: string,
    options?: { thread_id: string },
  ): Promise<void> {
    await this.API.deleteMessage(this.id, this.token, messageId, options);
  }

  /**
   * Fetches a message that was created by the webhook.
   *
   * @param {string} messageId - The ID of the message to fetch.
   * @param {RESTGetAPIWebhookWithTokenMessageQuery} [query] - The query parameters to send with the request.
   * @return {Promise<APIMessage>} A promise that resolves to the fetched message.
   */
  public async fetchMessage(
    messageId: string,
    query?: RESTGetAPIWebhookWithTokenMessageQuery,
  ): Promise<APIMessage> {
    return this.API.getMessage(this.id, this.token, messageId, query);
  }
}
