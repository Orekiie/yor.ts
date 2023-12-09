import {
  API,
  APIApplicationCommandAutocompleteInteraction,
} from '@discordjs/core';

import { Channel } from '../Channel';

import { BaseContext } from './BaseContext';

export class AutocompleteCommandContext extends BaseContext {
  private API: API['interactions'];

  public readonly raw: APIApplicationCommandAutocompleteInteraction;

  public channel: Channel;

  /**
   * Initializes a new instance of the APIApplicationCommandAutocompleteInteraction class.
   *
   * @param {API} API - The API used to initialize the instance.
   * @param {APIApplicationCommandAutocompleteInteraction} data - The data used to initialize the instance.
   */
  constructor(API: API, data: APIApplicationCommandAutocompleteInteraction) {
    super();

    this.API = API.interactions;

    this.raw = data;
    this.channel = new Channel(API.channels, this.raw.channel);
  }
}
