import {
  APIApplicationCommandAutocompleteInteraction,
  APICommandAutocompleteInteractionResponseCallbackData,
} from '@discordjs/core/http-only';
import { DiscordAPIError } from '@discordjs/rest';

import { Channel } from '../Channel';
import { YorClient } from '../YorClient';
import { YorClientAPI } from '../YorClientAPI';
import { YorClientError } from '../YorClientError';

import { BaseContext } from './BaseContext';

export class AutocompleteCommandContext extends BaseContext {
  private API: YorClientAPI['interactions'];

  public readonly raw: APIApplicationCommandAutocompleteInteraction;

  public readonly interactionId: string;
  public readonly applicationId: string;
  public readonly token: string;
  public channel: Channel;

  /**
   * Initializes a new instance of the APIApplicationCommandAutocompleteInteraction class.
   *
   * @param {YorClient} client - The client object.
   * @param {APIApplicationCommandAutocompleteInteraction} data - The data used to initialize the instance.
   */
  constructor(
    client: YorClient,
    data: APIApplicationCommandAutocompleteInteraction,
  ) {
    super(client);

    this.API = client.api.interactions;

    this.raw = data;

    this.interactionId = this.raw.id;
    this.applicationId = this.raw.application_id;
    this.token = this.raw.token;
    this.channel = new Channel(client, this.raw.channel);
  }

  public async respond(
    data: APICommandAutocompleteInteractionResponseCallbackData,
  ) {
    try {
      return this.API.createAutocompleteResponse(
        this.interactionId,
        this.token,
        data,
      );
    } catch (error) {
      if (error instanceof DiscordAPIError) {
        throw new YorClientError(error.message);
      }

      throw error;
    }
  }
}
