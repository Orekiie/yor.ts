import {
  APIApplicationCommandInteractionDataOption,
  APIApplicationCommandInteractionDataSubcommandGroupOption,
  APIApplicationCommandInteractionDataSubcommandOption,
  APIChatInputApplicationCommandInteraction,
  APIInteractionDataResolvedChannel,
  APIInteractionDataResolvedGuildMember,
  APIMessage,
  APIRole,
  ApplicationCommandOptionType,
  InteractionsAPI,
  MessageFlags,
} from '@discordjs/core/http-only';

import { Channel } from '../Channel';
import { Member } from '../Member';
import { User } from '../User';
import { YorClientAPI } from '../YorClientAPI';
import { YorClientError } from '../YorClientError';

import { BaseContext } from './BaseContext';

export class CommandContext extends BaseContext {
  public readonly raw: APIChatInputApplicationCommandInteraction;
  public readonly token: string;
  public readonly id: string;
  public channel: Channel;
  public user: User | undefined;
  public member: Member | undefined;

  public subcommandGroup?: APIApplicationCommandInteractionDataSubcommandGroupOption;
  public subcommand?: APIApplicationCommandInteractionDataSubcommandOption;

  public deferred = false;
  public replied = false;

  private API: InteractionsAPI;
  private users: YorClientAPI['users'];

  /**
   * Constructs a new instance of the APIApplicationCommandInteractionData class.
   *
   * @param {InteractionsAPI} API - The API used to initialize the instance.
   * @param {APIChatInputApplicationCommandInteraction} data - The data used to initialize the instance.
   */
  constructor(
    API: YorClientAPI,
    data: APIChatInputApplicationCommandInteraction,
  ) {
    super();
    this.API = API.interactions;
    this.users = API.users;

    this.raw = data;
    this.token = this.raw.token;
    this.id = this.raw.id;
    this.channel = new Channel(API.channels, this.raw.channel);
    this.user = this.raw.user ? new User(API.users, this.raw.user) : undefined;
    this.member =
      this.raw.member && this.raw.guild_id
        ? new Member(API, this.raw.guild_id, this.raw.member)
        : undefined;

    this.subcommandGroup = this.raw.data.options?.find(
      (option) => option.type === ApplicationCommandOptionType.SubcommandGroup,
    ) as APIApplicationCommandInteractionDataSubcommandGroupOption;
    this.subcommand = this.raw.data.options?.find(
      (option) => option.type === ApplicationCommandOptionType.Subcommand,
    ) as APIApplicationCommandInteractionDataSubcommandOption;
  }

  /**
   * Defers the execution of the function.
   *
   * @param {boolean} ephemeral - Whether the message is ephemeral or not.
   * @return {Promise<void>} A promise that resolves when the deferral is complete.
   */
  public async defer(ephemeral = false): Promise<void> {
    if (this.deferred || this.replied) {
      throw new YorClientError(
        'Cannot defer message already replied or deferred!',
      );
    }

    await this.API.defer(this.id, this.token, {
      flags: ephemeral ? MessageFlags.Ephemeral : undefined,
    });
    this.deferred = true;
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
    if (this.deferred || this.replied) {
      throw new YorClientError(
        'Cannot reply to message already replied or deferred!',
      );
    }

    await this.API.reply(this.id, this.token, data);
    this.replied = true;
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
    if (!this.deferred || !this.replied) {
      throw new YorClientError(
        'Cannot edit reply to message not replied or deferred!',
      );
    }

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
    if (this.deferred || this.replied) {
      throw new YorClientError(
        'Cannot show modal to message already replied or deferred!',
      );
    }

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

  /**
   * Checks if the instance is in a guild.
   *
   * @return {boolean} Returns true if the instance is in a guild, otherwise false.
   */
  public inGuild(): boolean {
    return Boolean(this.raw.guild_id);
  }

  /**
   * Retrieves a string option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {string | null} - The value of the option, or null if the option is not found and not required.
   */
  public getStringOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? string | null : string {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((option) => option.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find(
          (option) => option.name === name,
        );
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((option) => option.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? string | null : string;
    }

    if (option.type !== ApplicationCommandOptionType.String) {
      throw new YorClientError(`Option ${name} is not of type string.`);
    }

    return option.value as T extends true ? string | null : string;
  }

  /**
   * Retrieves a number option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {number | null} - The value of the option, or null if the option is not found and not required.
   */
  public getNumberOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? number | null : number {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? number | null : number;
    }

    if (option.type !== ApplicationCommandOptionType.Number) {
      throw new YorClientError(`Option ${name} is not of type number.`);
    }

    return option.value as T extends true ? number | null : number;
  }

  /**
   * Retrieves an integer option from the API.
   *
   * @param {string} name - The name of the option.
   * @param {0 | 1 | 2} index - The index of the option.
   * @param {boolean} required - Whether the option is required or not.
   * @return {number | null} - The value of the option.
   */
  public getIntegerOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? number | null : number {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? number | null : number;
    }

    if (option.type !== ApplicationCommandOptionType.Integer) {
      throw new YorClientError(`Option ${name} is not of type integer.`);
    }

    return option.value as T extends true ? number | null : number;
  }

  /**
   * Retrieves a boolean option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {boolean | null} - The value of the option, or null if the option is not found and not required.
   */
  public getBooleanOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? boolean | null : boolean {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? boolean | null : boolean;
    }

    if (option.type !== ApplicationCommandOptionType.Boolean) {
      throw new YorClientError(`Option ${name} is not of type boolean.`);
    }

    return option.value as T extends true ? boolean | null : boolean;
  }

  /**
   * Retrieves a user option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {User | null} - The value of the option, or null if the option is not found and not required.
   */
  public getUserOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? User : User | null {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? User : User | null;
    }

    // @ts-expect-error - value property does not exist according to typescript
    const resolved = this.raw.data.resolved?.users?.[option.value as string];

    if (option.type !== ApplicationCommandOptionType.User) {
      throw new YorClientError(`Option ${name} is not of type user.`);
    }

    if (!resolved) {
      throw new YorClientError(`Option ${name} is required.`);
    }

    return new User(this.users, resolved) as T extends true
      ? User
      : User | null;
  }

  /**
   * Retrieves a role option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {Role | null} - The value of the option, or null if the option is not found and not required.
   */
  public getRoleOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true ? APIRole | null : APIRole {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true ? APIRole | null : APIRole;
    }

    // @ts-expect-error - value property does not exist according to typescript
    const resolved = this.raw.data.resolved?.roles?.[option.value as string];

    if (option.type !== ApplicationCommandOptionType.Role) {
      throw new YorClientError(`Option ${name} is not of type role.`);
    }

    return resolved as T extends true ? APIRole | null : APIRole;
  }

  /**
   * Retrieves a channel option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {Channel | null} - The value of the option, or null if the option is not found and not required.
   */
  public getChannelOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true
    ? APIInteractionDataResolvedChannel
    : null | APIInteractionDataResolvedChannel {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true
        ? APIInteractionDataResolvedChannel
        : null | APIInteractionDataResolvedChannel;
    }

    // @ts-expect-error - value property does not exist according to typescript
    const resolved = this.raw.data.resolved?.channels?.[option.value as string];

    if (option.type !== ApplicationCommandOptionType.Channel) {
      throw new YorClientError(`Option ${name} is not of type channel.`);
    }

    if (!resolved) {
      throw new YorClientError(`Option ${name} is not resolved.`);
    }

    return resolved as T extends true
      ? APIInteractionDataResolvedChannel
      : null | APIInteractionDataResolvedChannel;
  }

  /**
   * Retrieves a user option from the command's options.
   *
   * @param {string} name - The name of the option to retrieve.
   * @param {0 | 1 | 2} index - (Optional) The index of the option to retrieve. Defaults to 0.
   * @param {boolean} required - (Optional) Specifies if the option is required. Defaults to false.
   * @return {User | null} - The value of the option, or null if the option is not found and not required.
   */
  public getMemberOption<T extends boolean>(
    name: string,
    index: 0 | 1 | 2 = 0,
    required?: T,
  ): T extends true
    ? APIInteractionDataResolvedGuildMember
    : null | APIInteractionDataResolvedGuildMember {
    const options = this.raw.data.options;
    if (!options) {
      throw new YorClientError('This command has no options.');
    }

    let option: APIApplicationCommandInteractionDataOption | undefined;

    switch (index) {
      case 0:
        option = options.find((o) => o.name === name);
        break;

      case 1:
        option = this.subcommand?.options?.find((o) => o.name === name);
        break;

      case 2:
        option = this.subcommandGroup?.options.find(
          (o) => o.options?.find((o) => o.name === name),
        );
        break;

      default:
        break;
    }

    if (!option) {
      if (required) {
        throw new YorClientError(`Option ${name} is required.`);
      }

      return null as T extends true
        ? APIInteractionDataResolvedGuildMember
        : null | APIInteractionDataResolvedGuildMember;
    }

    // @ts-expect-error - value property does not exist according to typescript
    const resolved = this.raw.data.resolved?.members?.[option.value as string];

    if (option.type !== ApplicationCommandOptionType.User) {
      throw new YorClientError(`Option ${name} is not of type user.`);
    }

    return resolved as T extends true
      ? APIInteractionDataResolvedGuildMember
      : null | APIInteractionDataResolvedGuildMember;
  }
}
