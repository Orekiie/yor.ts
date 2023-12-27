/* eslint-disable no-nested-ternary */

import {
  APIMessage,
  APIModalSubmitInteraction,
  MessageFlags,
  ModalSubmitActionRowComponent,
  RESTPostAPIWebhookWithTokenJSONBody,
} from '@discordjs/core/http-only';
import { DiscordAPIError, RawFile } from '@discordjs/rest';

import { Channel } from '../Channel';
import { Member } from '../Member';
import { User } from '../User';
import { YorClient } from '../YorClient';
import { YorClientAPI } from '../YorClientAPI';
import { YorClientError } from '../YorClientError';

import { BaseContext } from './BaseContext';

export class ModalContext extends BaseContext {
  public readonly raw: APIModalSubmitInteraction;

  public readonly customId: string;
  public readonly interactionId: string;
  public readonly applicationId: string;
  public readonly token: string;

  public components: ModalSubmitActionRowComponent[];
  public channel: Channel | undefined;
  public user: User | undefined;
  public member: Member | undefined;

  private API: YorClientAPI;

  /**
   * Initializes a new instance of the constructor.
   *
   * @param {YorClient} client - The client object.
   * @param {APIModalSubmitInteraction} data - The data to initialize the instance with.
   */
  constructor(client: YorClient, data: APIModalSubmitInteraction) {
    super(client);
    this.API = client.api;

    this.raw = data;

    this.customId = this.raw.data.custom_id;
    this.applicationId = this.raw.application_id;
    this.interactionId = this.raw.id;
    this.token = this.raw.token;

    this.channel = new Channel(this.client, this.raw.channel);
    this.user = this.raw.user
      ? new User(this.client, this.raw.user)
      : this.raw.member
        ? new User(this.client, this.raw.member.user)
        : undefined;
    this.member =
      this.raw.member && this.raw.guild_id
        ? new Member(this.client, this.raw.guild_id, this.raw.member)
        : undefined;

    this.components = this.raw.data.components;
  }

  /**
   * Determines if the function is from a message.
   *
   * @return {boolean} Returns true if the function is from a message, otherwise false.
   */
  public isFromMessage(): boolean {
    return Boolean(this.raw.message);
  }

  /**
   * Defers the execution of the function.
   *
   * @param {boolean} ephemeral - Whether the message is ephemeral or not.
   * @return {Promise<void>} A promise that resolves when the deferral is complete.
   */
  public async defer(ephemeral = false): Promise<void> {
    try {
      await this.API.interactions.defer(this.interactionId, this.token, {
        flags: ephemeral ? MessageFlags.Ephemeral : undefined,
      });
    } catch (error) {
      if (error instanceof DiscordAPIError) {
        throw new YorClientError(error.message);
      }

      throw error;
    }
  }

  /**
   * Replies to an interaction.
   *
   * @param {Omit<RESTPostAPIWebhookWithTokenJSONBody, "username" | "avatar_url"> & { flags?: MessageFlags | undefined; } & { files?: RawFile[] }} data - The data for creating the reply.
   * @return {Promise<void>} A promise that resolves when the reply is sent.
   */
  public async reply(
    data: Omit<
      RESTPostAPIWebhookWithTokenJSONBody,
      'username' | 'avatar_url'
    > & { flags?: MessageFlags | undefined } & { files?: RawFile[] },
  ): Promise<void> {
    try {
      await this.API.interactions.reply(this.interactionId, this.token, data);
    } catch (error) {
      if (error instanceof DiscordAPIError) {
        throw new YorClientError(error.message);
      }

      throw error;
    }
  }

  /**
   * Edits a reply.
   *
   * @param {Omit<RESTPostAPIWebhookWithTokenJSONBody, "username" | "avatar_url"> & { flags?: MessageFlags | undefined; } & { files?: RawFile[] }} data - The data for editing the reply.
   * @return {Promise<APIMessage>} A promise that resolves when the reply is edited.
   */
  public async editReply(
    data: Omit<
      RESTPostAPIWebhookWithTokenJSONBody,
      'username' | 'avatar_url'
    > & { flags?: MessageFlags | undefined } & { files?: RawFile[] },
  ): Promise<APIMessage> {
    try {
      return this.API.interactions.editReply(
        this.applicationId,
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

  /**
   * Deletes a reply.
   *
   * @return {Promise<void>} A promise that resolves when the reply is deleted.
   */
  public async deleteReply(): Promise<void> {
    await this.API.interactions.deleteReply(this.applicationId, this.token);
  }

  /**
   * Fetches the reply asynchronously.
   *
   * @return {Promise<APIMessage>} A promise that resolves when the original reply is fetched.
   */
  public async fetchReply(): Promise<APIMessage> {
    return this.API.interactions.getOriginalReply(
      this.applicationId,
      this.token,
    );
  }

  /**
   * Calls the followUp method of the API class with the provided data.
   *
   * @param {Omit<RESTPostAPIWebhookWithTokenJSONBody, "username" | "avatar_url"> & { flags?: MessageFlags | undefined; } & { files?: RawFile[] }} data - The data to be passed to the followUp method.
   * @return {Promise<APIMessage>} A promise that resolves to an APIMessage object.
   */
  public async followUp(
    data: Omit<
      RESTPostAPIWebhookWithTokenJSONBody,
      'username' | 'avatar_url'
    > & { flags?: MessageFlags | undefined } & { files?: RawFile[] },
  ): Promise<APIMessage> {
    return this.API.interactions.followUp(this.applicationId, this.token, data);
  }
}
