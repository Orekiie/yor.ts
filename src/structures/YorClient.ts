import { Collection } from '@discordjs/collection';
import {
  APIChatInputApplicationCommandInteraction,
  APIInteraction,
  APIInteractionResponse,
  APIMessageApplicationCommandInteraction,
  APIUserApplicationCommandInteraction,
  ApplicationCommandType,
  InteractionType,
  RESTPutAPIApplicationCommandsResult,
} from '@discordjs/core/http-only';
import { REST, RESTOptions } from '@discordjs/rest';
import { InteractionResponseType, verifyKey } from 'discord-interactions';

import { AutocompleteCommandContext } from './Contexts/AutocompleteCommandContext';
import { CommandContext } from './Contexts/CommandContext';
import { ComponentContext } from './Contexts/ComponentContext';
import { MessageContextMenuCommandInteraction } from './Contexts/ContextMenu/MessageContextMenuCommandInteraction';
import { UserContextMenuCommandInteraction } from './Contexts/ContextMenu/UserContextMenuCommandInteraction';
import { ModalContext } from './Contexts/ModalContext';
import { YorClientAPI } from './YorClientAPI';
import { YorClientError } from './YorClientError';
import {
  YorMessageContextMenuCommand,
  YorUserContextMenuCommand,
} from './YorContextMenuCommand';
import { YorInteractionComponent } from './YorInteractionComponent';
import { YorInteractionModal } from './YorInteractionModal';
import { YorSlashCommand } from './YorSlashCommand';

export interface YorClientOptions {
  token: string;
  application: {
    id: string;
    publicKey: string;
  };
  rest?: RESTOptions;
}

export type MiddlewareFunctionNames =
  | 'command'
  | 'component'
  | 'modal'
  | 'autocomplete'
  | 'message'
  | 'user';

export type MiddlewareFunction<T extends MiddlewareFunctionNames> =
  T extends 'command'
    ? (context: CommandContext) => Promise<void> | void
    : T extends 'component'
      ? (context: ComponentContext) => Promise<void> | void
      : T extends 'modal'
        ? (context: ModalContext) => Promise<void> | void
        : T extends 'autocomplete'
          ? (context: AutocompleteCommandContext) => Promise<void> | void
          : T extends 'message'
            ? (
                context: MessageContextMenuCommandInteraction,
              ) => Promise<void> | void
            : T extends 'user'
              ? (context: CommandContext) => Promise<void> | void
              : never;

export class YorClient {
  public readonly options: YorClientOptions;
  public readonly commands = new Collection<string, YorSlashCommand>();
  public readonly components = new Collection<
    string,
    YorInteractionComponent
  >();
  public readonly modals = new Collection<string, YorInteractionModal>();
  public readonly messageCommands = new Collection<
    string,
    YorMessageContextMenuCommand
  >();
  public readonly userCommands = new Collection<
    string,
    YorUserContextMenuCommand
  >();

  public rest: REST;
  public api: YorClientAPI;

  public middlewares: Record<
    MiddlewareFunctionNames,
    MiddlewareFunction<MiddlewareFunctionNames>[]
  >;

  /**
   * Creates a new instance of the class.
   *
   * @param {YorClientOptions} options - The configuration options for the client.
   */
  constructor(options: YorClientOptions) {
    this.options = options;

    this.rest = new REST({
      version: options.rest?.version || '10',
      ...options.rest,
    }).setToken(this.options.token);
    this.api = new YorClientAPI(this.rest);
    this.middlewares = {
      command: [],
      component: [],
      autocomplete: [],
      modal: [],
      message: [],
      user: [],
    };
  }

  /**
   * Registers a slash command.
   *
   * @param {YorSlashCommand} command - The slash command to register.
   * @return {Collection<string, YorSlashCommand>} - The updated commands collection.
   */
  public registerCommand(
    command: YorSlashCommand,
  ): Collection<string, YorSlashCommand> {
    if (this.commands.has(command.builder.name))
      throw new YorClientError(
        `Command with name ${command.builder.name} already exists.`,
      );

    this.commands.set(command.builder.name, command);
    return this.commands;
  }

  /**
   * Registers the provided slash commands.
   *
   * @param {YorSlashCommand[]} commands - The slash commands to register.
   * @return {Collection<string, YorSlashCommand>} - The updated commands map.
   */
  public registerCommands(
    commands: YorSlashCommand[],
  ): Collection<string, YorSlashCommand> {
    for (const command of commands) {
      if (this.commands.has(command.builder.name))
        throw new YorClientError(
          `Command with name ${command.builder.name} already exists.`,
        );

      this.commands.set(command.builder.name, command);
    }
    return this.commands;
  }

  /**
   * Unregisters a slash command.
   *
   * @param {YorSlashCommand} command - The slash command to unregister.
   * @return {Collection<string, YorSlashCommand>} - The updated commands collection.
   */
  public unregisterCommand(
    command: YorSlashCommand,
  ): Collection<string, YorSlashCommand> {
    this.commands.delete(command.builder.name);
    return this.commands;
  }

  /**
   * Unregisters the provided slash commands.
   *
   * @param {YorSlashCommand[]} commands - The slash commands to unregister.
   * @return {Collection<string, YorSlashCommand>} - The updated commands map.
   */
  public unregisterCommands(
    commands: YorSlashCommand[],
  ): Collection<string, YorSlashCommand> {
    for (const command of commands) {
      this.commands.delete(command.builder.name);
    }
    return this.commands;
  }

  /**
   * Unregisters all slash commands.
   *
   * @return {Collection<string, YorSlashCommand>} - The updated commands map.
   */
  public unregisterAllCommands(): Collection<string, YorSlashCommand> {
    this.commands.clear();
    return this.commands;
  }

  /**
   * Registers a message command.
   *
   * @param {YorMessageContextMenuCommand} command - The message command to register.
   * @return {Collection<string, YorMessageContextMenuCommand>} - The updated message commands collection.
   */
  public registerMessageCommand(
    command: YorMessageContextMenuCommand,
  ): Collection<string, YorMessageContextMenuCommand> {
    this.messageCommands.set(command.builder.name, command);
    return this.messageCommands;
  }

  /**
   * Unregisters a message command.
   *
   * @param {YorMessageContextMenuCommand} command - The message command to unregister.
   * @return {Collection<string, YorMessageContextMenuCommand>} - The updated message commands collection.
   */
  public unregisterMessageCommand(
    command: YorMessageContextMenuCommand,
  ): Collection<string, YorMessageContextMenuCommand> {
    this.messageCommands.delete(command.builder.name);
    return this.messageCommands;
  }

  /**
   * Registers a user command.
   *
   * @param {YorUserContextMenuCommand} command - The user command to register.
   * @return {Collection<string, YorUserContextMenuCommand>} - The updated user commands collection.
   */
  public registerUserCommand(
    command: YorUserContextMenuCommand,
  ): Collection<string, YorUserContextMenuCommand> {
    this.userCommands.set(command.builder.name, command);
    return this.userCommands;
  }

  /**
   * Unregisters a user command.
   *
   * @param {YorUserContextMenuCommand} command - The user command to unregister.
   * @return {Collection<string, YorUserContextMenuCommand>} - The updated user commands collection.
   */
  public unregisterUserCommand(
    command: YorUserContextMenuCommand,
  ): Collection<string, YorUserContextMenuCommand> {
    this.userCommands.delete(command.builder.name);
    return this.userCommands;
  }

  /**
   * Deploys the commands to the API application and returns the result.
   *
   * @return {Promise<RESTPutAPIApplicationCommandsResult>} The result of the deployment.
   */
  public async deployCommands(
    guild?: string,
  ): Promise<RESTPutAPIApplicationCommandsResult> {
    const commands = [
      ...this.commands.values(),
      ...this.messageCommands.values(),
      ...this.userCommands.values(),
    ].map((command) => command.builder.toJSON());

    const response = guild
      ? await this.api.applicationCommands.bulkOverwriteGuildCommands(
          this.options.application.id,
          guild,
          commands,
        )
      : await this.api.applicationCommands.bulkOverwriteGlobalCommands(
          this.options.application.id,
          commands,
        );
    return response;
  }

  /**
   * Registers a component in the collection.
   *
   * @param {YorInteractionComponent} component - The component to register.
   * @return {Collection<string, YorInteractionComponent>} - The updated collection of components.
   */
  public registerComponent(
    component: YorInteractionComponent,
  ): Collection<string, YorInteractionComponent> {
    if (this.components.has(component.id))
      throw new YorClientError(
        `Component with id ${component.id} already exists.`,
      );

    this.components.set(component.id, component);

    return this.components;
  }

  /**
   * Registers the given components in the collection.
   *
   * @param {YorInteractionComponent[]} components - The components to register.
   * @return {Collection<string, YorInteractionComponent>} - The updated collection of components.
   */
  public registerComponents(
    components: YorInteractionComponent[],
  ): Collection<string, YorInteractionComponent> {
    for (const component of components) {
      if (this.components.has(component.id))
        throw new YorClientError(
          `Component with id ${component.id} already exists.`,
        );

      this.components.set(component.id, component);
    }

    return this.components;
  }

  /**
   * Deletes the specified component from the collection and returns the updated collection.
   *
   * @param {YorInteractionComponent} component - The component to unregister.
   * @return {Collection<string, YorInteractionComponent>} - The updated collection of components.
   */
  public unregisterComponent(
    component: YorInteractionComponent,
  ): Collection<string, YorInteractionComponent> {
    this.components.delete(component.id);

    return this.components;
  }

  /**
   * Unregisters components from the collection.
   *
   * @param {YorInteractionComponent[]} components - The components to unregister.
   * @return {Collection<string, YorInteractionComponent>} - The updated components collection.
   */
  public unregisterComponents(
    components: YorInteractionComponent[],
  ): Collection<string, YorInteractionComponent> {
    for (const component of components) {
      this.components.delete(component.id);
    }

    return this.components;
  }

  /**
   * Registers a modal in the collection.
   *
   * @param {YorInteractionModal} modal - The modal to be registered.
   * @return {Collection<string, YorInteractionModal>} - The updated collection of modals.
   */
  public registerModal(
    modal: YorInteractionModal,
  ): Collection<string, YorInteractionModal> {
    if (this.modals.has(modal.id))
      throw new YorClientError(`Modal with id ${modal.id} already exists.`);

    this.modals.set(modal.id, modal);

    return this.modals;
  }

  /**
   * Registers the given modals in the collection.
   *
   * @param {YorInteractionModal[]} modals - The modals to be registered.
   * @return {Collection<string, YorInteractionModal>} - The updated collection of modals.
   */
  public registerModals(
    modals: YorInteractionModal[],
  ): Collection<string, YorInteractionModal> {
    for (const modal of modals) {
      if (this.modals.has(modal.id))
        throw new YorClientError(`Modal with id ${modal.id} already exists.`);

      this.modals.set(modal.id, modal);
    }

    return this.modals;
  }

  /**
   * Deletes the specified modal from the collection and returns the updated collection.
   *
   * @param {YorInteractionModal} modal - The modal to unregister.
   * @return {Collection<string, YorInteractionModal>} - The updated collection of modals.
   */
  public unregisterModal(
    modal: YorInteractionModal,
  ): Collection<string, YorInteractionModal> {
    this.modals.delete(modal.id);

    return this.modals;
  }

  /**
   * Unregisters modals from the collection.
   *
   * @param {YorInteractionModal[]} modals - The modals to unregister.
   * @return {Collection<string, YorInteractionModal>} - The updated collection of modals.
   */
  public unregisterModals(
    modals: YorInteractionModal[],
  ): Collection<string, YorInteractionModal> {
    for (const modal of modals) {
      this.modals.delete(modal.id);
    }

    return this.modals;
  }

  /**
   * Creates middleware for a given name and adds it to the middlewares array.
   *
   * @param {T} name - The name of the middleware.
   * @param {MiddlewareFunction<T>} middleware - The middleware function.
   */
  public createMiddleware<T extends MiddlewareFunctionNames>(
    name: T,
    middleware: MiddlewareFunction<T>,
  ) {
    this.middlewares[name].push(middleware);
  }

  /**
   * Handles an interaction request from the API.
   *
   * @param {Request} request - The request object containing the interaction data.
   * @return {Promise<APIInteractionResponse>} - An object containing a promise for the response.
   */
  public async handleInteraction(
    request: Request,
  ): Promise<APIInteractionResponse> {
    if (request.method !== 'POST') {
      throw new YorClientError('Invalid request method');
    }

    const body = await request.clone().text();

    const signature = request.headers.get('X-Signature-Ed25519');
    const timestamp = request.headers.get('X-Signature-Timestamp');

    if (!signature || !timestamp) {
      throw new YorClientError('Missing signature or timestamp');
    }

    const isValid = verifyKey(
      body,
      signature,
      timestamp,
      this.options.application.publicKey,
    );
    if (!isValid) {
      throw new YorClientError('Invalid signature');
    }

    const data = JSON.parse(body) as APIInteraction;

    // @ts-expect-error - ts(2345)
    return this.handleInteractionRequest(data);
  }

  /**
   * Handles the interaction request.
   * @param {APIInteraction} data - The interaction data.
   */
  private async handleInteractionRequest(data: APIInteraction) {
    if (data.type === InteractionType.Ping) {
      return { type: InteractionResponseType.PONG };
    }

    if (data.type === InteractionType.ApplicationCommand) {
      if (data.data.type === ApplicationCommandType.ChatInput) {
        const command = this.commands.get(data.data.name);
        if (!command) {
          throw new YorClientError(
            `Command with name ${data.data.name} not found.`,
          );
        }

        const context = new CommandContext(
          this,
          data as APIChatInputApplicationCommandInteraction,
        );

        for await (const middleware of this.middlewares.command) {
          // @ts-expect-error - ts(2345)
          await middleware(context);
        }

        await command.execute(context);

        return {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        };
      }

      if (data.data.type === ApplicationCommandType.Message) {
        const command = this.messageCommands
          .filter((command) => command.builder)
          .get(data.data.name);
        if (!command) {
          throw new YorClientError(
            `Command with name ${data.data.name} not found.`,
          );
        }

        const context = new MessageContextMenuCommandInteraction(
          this,
          data as APIMessageApplicationCommandInteraction,
        );

        for await (const middleware of this.middlewares.message) {
          // @ts-expect-error - ts(2345)
          await middleware(context);
        }

        await command.execute(context);
      }

      if (data.data.type === ApplicationCommandType.User) {
        const command = this.userCommands
          .filter((command) => command.builder)
          .get(data.data.name);
        if (!command) {
          throw new YorClientError(
            `Command with name ${data.data.name} not found.`,
          );
        }

        const context = new UserContextMenuCommandInteraction(
          this,
          data as APIUserApplicationCommandInteraction,
        );

        for await (const middleware of this.middlewares.user) {
          // @ts-expect-error - ts(2345)
          await middleware(context);
        }

        await command.execute(context);
      }
    }

    if (data.type === InteractionType.ApplicationCommandAutocomplete) {
      const command = this.commands
        .filter((command) => command.autocomplete)
        .get(data.data.name);
      if (!command) {
        throw new YorClientError(
          `Command with name ${data.data.name} not found.`,
        );
      }

      const context = new AutocompleteCommandContext(this, data);
      for await (const middleware of this.middlewares.autocomplete) {
        // @ts-expect-error - ts(2345)
        await middleware(context);
      }

      await command.autocomplete(context);
      return {
        type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
      };
    }

    if (data.type === InteractionType.MessageComponent) {
      const component = this.components.get(data.data.custom_id);
      if (!component) {
        throw new YorClientError(
          `Component with id ${data.data.custom_id} not found.`,
        );
      }

      const context = new ComponentContext(this, data);
      for await (const middleware of this.middlewares.component) {
        // @ts-expect-error - ts(2345)
        await middleware(context);
      }

      await component.execute(context);

      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      };
    }

    if (data.type === InteractionType.ModalSubmit) {
      const modal = this.modals.get(data.data.custom_id);
      if (!modal) {
        throw new YorClientError(
          `Modal with id ${data.data.custom_id} not found.`,
        );
      }

      const context = new ModalContext(this, data);
      for await (const middleware of this.middlewares.modal) {
        // @ts-expect-error - ts(2345)
        await middleware(context);
      }

      await modal.execute(context);

      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      };
    }

    return {
      type: InteractionResponseType.PONG,
    };
  }
}
