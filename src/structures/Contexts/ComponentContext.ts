import {
  APIMessage,
  APIMessageComponentInteraction,
  ComponentType,
  MessageFlags,
  RESTPostAPIWebhookWithTokenJSONBody,
} from '@discordjs/core/http-only';
import { RawFile } from '@discordjs/rest';

import { Channel } from '../Channel';
import { Member } from '../Member';
import { User } from '../User';
import { YorClientAPI } from '../YorClientAPI';

import { BaseContext } from './BaseContext';

export class ComponentContext extends BaseContext {
  public readonly raw: APIMessageComponentInteraction;
  public readonly id: string;
  public readonly token: string;
  public channel: Channel;
  public user: User | undefined;
  public member: Member | undefined;

  private API: YorClientAPI;

  /**
   * Creates a new instance of the constructor.
   *
   * @param {YorClientAPI} API - The API instance.
   * @param {APIMessageComponentInteraction} data - The data for the constructor.
   */
  constructor(API: YorClientAPI, data: APIMessageComponentInteraction) {
    super();

    this.API = API;

    this.raw = data;
    this.id = data.id;
    this.token = data.token;
    this.channel = new Channel(API.channels, this.raw.channel);
    this.user = this.raw.user ? new User(API.users, this.raw.user) : undefined;
    this.member =
      this.raw.member && this.raw.guild_id
        ? new Member(API, this.raw.guild_id, this.raw.member)
        : undefined;
  }

  /**
   * Defer a message update.
   *
   * @return {Promise<void>} A promise that resolves when the message update is deferred.
   */
  public async defer(): Promise<void> {
    return this.API.interactions.deferMessageUpdate(this.id, this.token);
  }

  /**
   * Updates the message using the provided data.
   *
   * @param {Omit<RESTPostAPIWebhookWithTokenJSONBody, 'username' | 'avatar_url'> & { flags?: MessageFlags | undefined } & { files: RawFile[] }} data - The updated message data.
   * @return {Promise<void>} A promise that resolves when the update is complete.
   */
  public async update(
    data: Omit<
      RESTPostAPIWebhookWithTokenJSONBody,
      'username' | 'avatar_url'
    > & { flags?: MessageFlags | undefined } & { files: RawFile[] },
  ): Promise<void> {
    return this.API.interactions.updateMessage(this.id, this.token, data);
  }

  /**
   * Calls the `followUp` method of the API with the provided data.
   *
   * @param {Omit<RESTPostAPIWebhookWithTokenJSONBody, "username" | "avatar_url"> & { flags?: MessageFlags | undefined; } & { files: RawFile[] }} data - The data to be passed to the `followUp` method.
   * @return {Promise<APIMessage>} A promise that resolves to the response from the `followUp` method.
   */
  public async followUp(
    data: Omit<
      RESTPostAPIWebhookWithTokenJSONBody,
      'username' | 'avatar_url'
    > & { flags?: MessageFlags | undefined } & { files: RawFile[] },
  ): Promise<APIMessage> {
    return this.API.interactions.followUp(this.id, this.token, data);
  }

  /**
   * Reply to a message.
   *
   * @param {Omit<RESTPostAPIWebhookWithTokenJSONBody, "username" | "avatar_url"> & { flags?: MessageFlags | undefined; } & { files: RawFile[] }} data - The data to reply with.
   * @return {Promise<void>} A promise that resolves when the reply is sent.
   */
  public async reply(
    data: Omit<
      RESTPostAPIWebhookWithTokenJSONBody,
      'username' | 'avatar_url'
    > & { flags?: MessageFlags | undefined } & { files: RawFile[] },
  ): Promise<void> {
    return this.API.interactions.reply(this.id, this.token, data);
  }

  /**
   * Calls the `editReply` method of the API with the provided data.
   *
   * @param {Omit<RESTPostAPIWebhookWithTokenJSONBody, "username" | "avatar_url"> & { flags?: MessageFlags | undefined; } & { files: RawFile[] }} data - The data to be passed to the `editReply` method.
   * @return {Promise<APIMessage>} A promise that resolves to the response from the `editReply` method.
   */
  public async editReply(
    data: Omit<
      RESTPostAPIWebhookWithTokenJSONBody,
      'username' | 'avatar_url'
    > & { flags?: MessageFlags | undefined } & { files: RawFile[] },
  ): Promise<APIMessage> {
    return this.API.interactions.editReply(this.id, this.token, data);
  }

  /**
   * Determines if the element is a button.
   *
   * @return {boolean} - Returns `true` if the element is a button, `false` otherwise.
   */
  public isButton(): boolean {
    return this.raw.data.component_type === ComponentType.Button;
  }

  /**
   * Determines if the select menu is of type string.
   *
   * @return {boolean} true if the select menu is of type string, false otherwise
   */
  public isStringSelectMenu(): boolean {
    return this.raw.data.component_type === ComponentType.StringSelect;
  }

  /**
   * Checks if the component is a channel select menu.
   *
   * @return {boolean} - Returns true if the component is a channel select menu, otherwise false.
   */
  public isChannelSelectMenu(): boolean {
    return this.raw.data.component_type === ComponentType.ChannelSelect;
  }

  /**
   * Determines if the select menu is mentionable.
   *
   * @return {boolean} True if the select menu is mentionable, false otherwise.
   */
  public isMentionableSelectMenu(): boolean {
    return this.raw.data.component_type === ComponentType.MentionableSelect;
  }

  /**
   * Determines if the function is a role select menu.
   *
   * @return {boolean} True if the function is a role select menu, false otherwise.
   */
  public isRoleSelectMenu(): boolean {
    return this.raw.data.component_type === ComponentType.RoleSelect;
  }

  /**
   * Determines whether the component type of the raw data is a UserSelect.
   *
   * @return {boolean} true if the component type is UserSelect, false otherwise
   */
  public isUserSelectMenu(): boolean {
    return this.raw.data.component_type === ComponentType.UserSelect;
  }
}
