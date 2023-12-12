/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { channelMention } from '@discordjs/builders';
import {
  APIBaseInteraction,
  APIChannel,
  APIInvite,
  APIMessage,
  APIWebhook,
  ChannelFlags,
  ChannelType,
  ChannelsAPI,
  RESTGetAPIChannelMessagesQuery,
  RESTPatchAPIChannelJSONBody,
  RESTPatchAPIChannelMessageJSONBody,
  RESTPostAPIChannelInviteJSONBody,
  RESTPostAPIChannelMessageJSONBody,
  RESTPostAPIChannelWebhookJSONBody,
} from '@discordjs/core/http-only';
import { RawFile } from '@discordjs/rest';

import { YorClientError } from './YorClientError';

export class Channel {
  public id: string;
  public name: string | undefined;
  public type: number;
  public flags?: ChannelFlags | undefined;

  public raw: Partial<APIChannel>;

  private API: ChannelsAPI;

  /**
   * Constructs a new instance of the class.
   *
   * @param {ChannelsAPI} API - The ChannelsAPI instance.
   * @param {APIBaseInteraction<any, any>['channel']} data - The channel data.
   * @throws {YorClientError} If channel data is not provided.
   */
  constructor(API: ChannelsAPI, data: APIBaseInteraction<any, any>['channel']) {
    this.API = API;

    if (!data) {
      throw new YorClientError('Channel data is required');
    }

    this.id = data.id;
    this.name = data.name as string | undefined;
    this.type = data.type;
    this.flags = data.flags as ChannelFlags | undefined;

    this.raw = data as Partial<APIChannel>;
  }

  /**
   * Sends a message with the given data.
   *
   * @param {RESTPostAPIChannelMessageJSONBody & { files?: RawFile[] }} data - The data for the message.
   * @return {Promise<APIMessage>} A promise that resolves to the created message.
   */
  public async send(
    data: RESTPostAPIChannelMessageJSONBody & { files?: RawFile[] },
  ): Promise<APIMessage> {
    return this.API.createMessage(this.id, data);
  }

  /**
   * Edits a message.
   *
   * @param {string} messageId - The ID of the message to be edited.
   * @param {RESTPatchAPIChannelMessageJSONBody & { files?: RawFile[] }} data - The data to be updated in the message.
   * @return {Promise<APIMessage>} - A promise that resolves to the edited message.
   */
  public async editMessage(
    messageId: string,
    data: RESTPatchAPIChannelMessageJSONBody & { files?: RawFile[] },
  ): Promise<APIMessage> {
    return this.API.editMessage(this.id, messageId, data);
  }

  /**
   * Fetches a specific message by its ID.
   *
   * @param {string} messageId - The ID of the message to fetch.
   * @return {Promise<APIMessage>} A Promise that resolves to the fetched message.
   */
  public async fetchMessage(messageId: string): Promise<APIMessage> {
    return this.API.getMessage(this.id, messageId);
  }

  /**
   * Fetches messages using the provided data.
   *
   * @param {RESTGetAPIChannelMessagesQuery } data - The data used to fetch messages.
   * @return {Promise<APIMessage[]>} A promise that resolves to an array of API messages.
   */
  public async fetchMessages(
    data: RESTGetAPIChannelMessagesQuery,
  ): Promise<APIMessage[]> {
    return this.API.getMessages(this.id, data);
  }

  /**
   * Crossposts a message.
   *
   * @param {string} messageId - The ID of the message to crosspost.
   * @return {Promise<APIMessage>} A promise that resolves to the crossposted message.
   */
  public async crosspostMessage(messageId: string): Promise<APIMessage> {
    return this.API.crosspostMessage(this.id, messageId);
  }

  /**
   * Creates an invite using the given data and returns the created invite.
   *
   * @param {RESTPostAPIChannelInviteJSONBody} data - The data used to create the invite.
   * @return {Promise<APIInvite>} The created invite.
   */
  public async createInvite(
    data: RESTPostAPIChannelInviteJSONBody,
  ): Promise<APIInvite> {
    return this.API.createInvite(this.id, data);
  }

  /**
   * Retrieves the invites.
   *
   * @return {Promise<APIInvite[]>} The list of invites.
   */
  public async getInvites(): Promise<APIInvite[]> {
    return this.API.getInvites(this.id);
  }

  /**
   * Deletes the channel
   *
   * @return {Promise<APIChannel>} Promise that resolves to the deleted channel
   */
  public async delete(): Promise<APIChannel> {
    return this.API.delete(this.id);
  }

  /**
   * Edits the channel
   *
   * @param {RESTPatchAPIChannelJSONBody} data - The data used to edit the channel
   * @return {Promise<APIChannel>} Promise that resolves to the edited channel
   */
  public async edit(data: RESTPatchAPIChannelJSONBody): Promise<APIChannel> {
    return this.API.edit(this.id, data);
  }

  /**
   * Bulk deletes messages
   *
   * @param {string[]} messages - The data used to bulk delete messages
   * @return {Promise<void>} Promise that resolves when the messages are deleted
   */
  public async bulkDeleteMessages(messages: string[]): Promise<void> {
    return this.API.bulkDeleteMessages(this.id, messages);
  }

  /**
   * Pin a message
   *
   * @param {string} messageId - The data used to pin a message
   * @return {Promise<void>} Promise that resolves when the message is pinned
   */
  public async pinMessage(messageId: string): Promise<void> {
    return this.API.pinMessage(this.id, messageId);
  }

  /**
   * Unpin a message
   *
   * @param {string} messageId - The data used to unpin a message
   * @return {Promise<void>} Promise that resolves when the message is unpinned
   */
  public async unpinMessage(messageId: string): Promise<void> {
    return this.API.unpinMessage(this.id, messageId);
  }

  /**
   * Returns the created timestamp as a Date object.
   *
   * @return {number} The created timestamp.
   */
  public createdTimestamp(): number {
    try {
      const milliseconds = BigInt(parseInt(this.id)) >> 22n;
      return new Date(Number(milliseconds) + 1420070400000).valueOf();
    } catch (error) {
      throw new YorClientError('Invalid snowflake');
    }
  }

  /**
   * Returns the creation date of the object.
   *
   * @return {Date} The creation date of the object.
   */
  public createdAt(): Date {
    return new Date(this.createdTimestamp());
  }

  /**
   * Checks if the channel type is a thread.
   *
   * @return {boolean} true if the channel type is a thread, false otherwise
   */
  public isThread(): boolean {
    return [
      ChannelType.AnnouncementThread,
      ChannelType.PrivateThread,
      ChannelType.PublicThread,
    ].includes(this.type);
  }

  /**
   * Determines if the channel is voice-based.
   *
   * @return {boolean} Returns true if the channel is voice-based, false otherwise.
   */
  public isVoiceBased(): boolean {
    return [ChannelType.GuildStageVoice, ChannelType.GuildVoice].includes(
      this.type,
    );
  }

  /**
   * Checks if the function is text-based.
   *
   * @return {boolean} true if the function is text-based, false otherwise.
   */
  public isTextBased(): boolean {
    return !this.isVoiceBased();
  }

  /**
   * Determines if the channel is DM-based.
   *
   * @return {boolean} - True if the channel is DM-based, false otherwise.
   */
  public isDMBased(): boolean {
    return [ChannelType.DM, ChannelType.GroupDM].includes(this.type);
  }

  /**
   * Returns a string representation of the channel.
   *
   * @return {string} The string representation of the channel.
   */
  public toString(): `<#${string}>` {
    return channelMention(this.id);
  }

  /**
   * Creates a webhook in the current channel or parent channel (if a thread) with the given data
   *
   * @param {RESTPostAPIChannelWebhookJSONBody} data - The data for creating the webhook.
   * @param {string} data.reason - The reason for creating the webhook.
   * @return {Promise<APIWebhook>} A promise that resolves with the created webhook.
   */
  public async createWebhook({
    reason,
    ...data
  }: RESTPostAPIChannelWebhookJSONBody & {
    reason: string;
  }): Promise<APIWebhook> {
    if (!this.isTextBased()) {
      throw new YorClientError(
        'Cannot create a webhook in a non-text-based channel',
      );
    }

    if (this.isThread()) {
      // @ts-expect-error - parent_id will only exist in the data when the channel is a thread;
      return this.API.createWebhook(this.raw.parent_id, data, { reason });
    }

    return this.API.createWebhook(this.id, data, { reason });
  }

  /**
   * Gets all webhooks in the current channel or parent channel (if a thread)
   *
   * @return {Promise<APIWebhook[]>} A promise that resolves with an array of webhooks.
   */
  public async getWebhooks(): Promise<APIWebhook[]> {
    if (!this.isTextBased()) {
      throw new YorClientError(
        'Cannot delete a webhook in a non-text-based channel',
      );
    }

    return this.API.getWebhooks(this.id);
  }
}
