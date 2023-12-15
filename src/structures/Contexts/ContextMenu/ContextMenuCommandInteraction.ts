import {
  APIMessage,
  APIMessageApplicationCommandInteraction,
  APIModalInteractionResponseCallbackData,
  APIUserApplicationCommandInteraction,
  MessageFlags,
  RESTPostAPIWebhookWithTokenJSONBody,
} from '@discordjs/core/http-only';
import { DiscordAPIError, RawFile } from '@discordjs/rest';

import { YorClient } from '../../YorClient';
import { YorClientError } from '../../YorClientError';
import { BaseContext } from '../BaseContext';

export class ContextMenuCommandInteraction extends BaseContext {
  public raw:
    | APIUserApplicationCommandInteraction
    | APIMessageApplicationCommandInteraction;

  public token: string;
  public targetId: string;
  public interactionId: string;
  public applicationId: string;

  /**
   * Represents a context menu command
   *
   * @param {YorClient} client - The client object.
   * @param {APIUserApplicationCommandInteraction | APIMessageApplicationCommandInteraction} data - The data object.
   */
  constructor(
    client: YorClient,
    data:
      | APIUserApplicationCommandInteraction
      | APIMessageApplicationCommandInteraction,
  ) {
    super(client);

    this.raw = data;

    this.token = this.raw.token;
    this.targetId = this.raw.data.target_id;
    this.interactionId = this.raw.id;
    this.applicationId = this.raw.application_id;
  }

  /**
   * Defers the execution of the function.
   *
   * @param {boolean} ephemeral - Whether the message is ephemeral or not.
   * @return {Promise<void>} A promise that resolves when the deferral is complete.
   */
  public async defer(ephemeral = false): Promise<void> {
    try {
      await this.client.api.interactions.defer(this.interactionId, this.token, {
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
      await this.client.api.interactions.reply(
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
      return this.client.api.interactions.editReply(
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
    await this.client.api.interactions.deleteReply(
      this.applicationId,
      this.token,
    );
  }

  /**
   * Fetches the reply asynchronously.
   *
   * @return {Promise<APIMessage>} A promise that resolves when the original reply is fetched.
   */
  public async fetchReply(): Promise<APIMessage> {
    return this.client.api.interactions.getOriginalReply(
      this.applicationId,
      this.token,
    );
  }

  /**
   * Reply to a modal.
   *
   * @param {APIModalInteractionResponseCallbackData} data - The data for creating the modal.
   * @return {Promise<void>} A promise that resolves when the modal is created.
   */
  public async replyModal(
    data: APIModalInteractionResponseCallbackData,
  ): Promise<void> {
    try {
      await this.client.api.interactions.createModal(
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
    return this.client.api.interactions.followUp(
      this.applicationId,
      this.token,
      data,
    );
  }
}
