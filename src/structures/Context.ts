import {
  APIApplicationCommandAutocompleteInteraction,
  APIApplicationCommandInteraction,
  APIMessage,
  APIMessageComponentInteraction,
  APIModalSubmitInteraction,
  InteractionsAPI,
  MessageFlags,
} from '@discordjs/core';

export class CommandContext {
  public readonly raw: APIApplicationCommandInteraction;
  public token: string;
  public id: string;

  private API: InteractionsAPI;

  /**
   * Constructs a new instance of the APIApplicationCommandInteractionData class.
   *
   * @param {InteractionsAPI} API - The API used to initialize the instance.
   * @param {APIApplicationCommandInteraction} data - The data used to initialize the instance.
   */
  constructor(API: InteractionsAPI, data: APIApplicationCommandInteraction) {
    this.API = API;

    this.raw = data;
    this.token = this.raw.token;
    this.id = this.raw.id;
  }

  /**
   * Defers the execution of the function.
   *
   * @param {boolean} ephemeral - Whether the message is ephemeral or not.
   * @return {Promise<void>} A promise that resolves when the deferral is complete.
   */
  public async defer(ephemeral = false): Promise<void> {
    await this.API.defer(this.id, this.token, {
      flags: ephemeral ? MessageFlags.Ephemeral : undefined,
    });
  }

  /**
   * A description of the entire function.
   *
   * @param {Parameters<typeof this.API.reply>[2]} data - description of the data parameter
   * @return {Promise<void>} description of the return value
   */
  public async reply(
    data: Parameters<typeof this.API.reply>[2],
  ): Promise<void> {
    await this.API.reply(this.id, this.token, data);
  }

  /**
   * Edits a reply.
   *
   * @param {Parameters<typeof this.API.reply>[2]} data - The data for editing the reply.
   * @return {Promise<APIMessage>} A promise that resolves when the reply is edited.
   */
  public async editReply(
    data: Parameters<typeof this.API.reply>[2],
  ): Promise<APIMessage> {
    return this.API.editReply(this.id, this.token, data);
  }

  /**
   * Deletes a reply.
   *
   * @return {Promise<void>} A promise that resolves when the reply is deleted.
   */
  public async deleteReply(): Promise<void> {
    await this.API.deleteReply(this.id, this.token);
  }

  /**
   * Fetches the reply asynchronously.
   *
   * @return {Promise<APIMessage>} A promise that resolves when the original reply is fetched.
   */
  public async fetchReply(): Promise<APIMessage> {
    return this.API.getOriginalReply(this.id, this.token);
  }

  /**
   * Reply to a modal.
   *
   * @param {Parameters<typeof this.API.createModal>[2]} data - The data for creating the modal.
   * @return {Promise<void>} A promise that resolves when the modal is created.
   */
  public async replyModal(
    data: Parameters<typeof this.API.createModal>[2],
  ): Promise<void> {
    await this.API.createModal(this.id, this.token, data);
  }

  /**
   * Calls the followUp method of the API class with the provided data.
   *
   * @param {Parameters<typeof this.API.followUp>[2]} data - The data to be passed to the followUp method.
   * @return {Promise<APIMessage>} A promise that resolves to an APIMessage object.
   */
  public async followUp(
    data: Parameters<typeof this.API.followUp>[2],
  ): Promise<APIMessage> {
    return this.API.followUp(this.id, this.token, data);
  }
}

export class AutocompleteCommandContext {
  public readonly raw: APIApplicationCommandAutocompleteInteraction;

  /**
   * Initializes a new instance of the APIApplicationCommandAutocompleteInteraction class.
   *
   * @param {APIApplicationCommandAutocompleteInteraction} data - The data used to initialize the instance.
   */
  constructor(data: APIApplicationCommandAutocompleteInteraction) {
    this.raw = data;
  }
}

export class ModalContext {
  public readonly raw: APIModalSubmitInteraction;

  /**
   * Initializes a new instance of the constructor.
   *
   * @param {APIModalSubmitInteraction} data - The data to initialize the instance with.
   */
  constructor(data: APIModalSubmitInteraction) {
    this.raw = data;
  }
}

export class ComponentContext {
  public readonly raw: APIMessageComponentInteraction;
  public readonly id: string;
  public readonly token: string;

  private API: InteractionsAPI;

  /**
   * Creates a new instance of the constructor.
   *
   * @param {InteractionsAPI} API - The API instance.
   * @param {APIMessageComponentInteraction} data - The data for the constructor.
   */
  constructor(API: InteractionsAPI, data: APIMessageComponentInteraction) {
    this.API = API;

    this.raw = data;
    this.id = data.id;
    this.token = data.token;
  }

  /**
   * Defer a message update.
   *
   * @param {Parameters<typeof this.API.deferMessageUpdate>[2]} data - The data for deferring the message update.
   * @return {Promise<void>} A promise that resolves when the message update is deferred.
   */
  public async defer(
    data: Parameters<typeof this.API.deferMessageUpdate>[2],
  ): Promise<void> {
    await this.API.deferMessageUpdate(this.id, this.token, data);
  }
}
