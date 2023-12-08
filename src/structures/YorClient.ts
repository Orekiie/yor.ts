/* eslint-disable no-async-promise-executor */
import { Collection } from '@discordjs/collection';
import {
  API,
  APIInteraction,
  InteractionType,
  RESTPutAPIApplicationCommandsResult,
} from '@discordjs/core';
import { REST, RESTOptions } from '@discordjs/rest';
import { APIInteractionResponse } from 'discord-api-types/v10';
import { InteractionResponseType, verifyKey } from 'discord-interactions';

import { CommandContext, ComponentContext } from './Context';
import { SlashCommand } from './SlashCommand';
import { YorClientError } from './YorClientError';
import { YorInteractionComponent } from './YorInteractionComponent';

export interface YorClientOptions {
  token: string;
  application: {
    id: string;
    publicKey: string;
  };
  rest?: RESTOptions;
}

export type MiddlewareFunctionNames = 'command' | 'component';

export type MiddlewareFunction<T extends MiddlewareFunctionNames> =
  T extends 'command'
    ? (context: CommandContext) => Promise<void> | void
    : T extends 'component'
      ? (context: ComponentContext) => Promise<void> | void
      : never;

export class YorClient {
  public readonly options: YorClientOptions;
  public readonly commands = new Collection<string, SlashCommand>();
  public readonly components = new Collection<
    string,
    YorInteractionComponent
  >();

  public rest: REST;
  public api: API;

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

    this.rest = new REST(this.options.rest || { version: '10' }).setToken(
      this.options.token,
    );
    this.api = new API(this.rest);
    this.middlewares = {
      command: [],
      component: [],
    };
  }

  /**
   * Registers a slash command.
   *
   * @param {SlashCommand} command - The slash command to register.
   * @return {Collection<string, SlashCommand>} - The updated commands collection.
   */
  public registerCommand(
    command: SlashCommand,
  ): Collection<string, SlashCommand> {
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
   * @param {SlashCommand[]} commands - The slash commands to register.
   * @return {Collection<string, SlashCommand>} - The updated commands map.
   */
  public registerCommands(
    commands: SlashCommand[],
  ): Collection<string, SlashCommand> {
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
   * @param {SlashCommand} command - The slash command to unregister.
   * @return {Collection<string, SlashCommand>} - The updated commands collection.
   */
  public unregisterCommand(
    command: SlashCommand,
  ): Collection<string, SlashCommand> {
    this.commands.delete(command.builder.name);
    return this.commands;
  }

  /**
   * Unregisters the provided slash commands.
   *
   * @param {SlashCommand[]} commands - The slash commands to unregister.
   * @return {Collection<string, SlashCommand>} - The updated commands map.
   */
  public unregisterCommands(
    commands: SlashCommand[],
  ): Collection<string, SlashCommand> {
    for (const command of commands) {
      this.commands.delete(command.builder.name);
    }
    return this.commands;
  }

  /**
   * Unregisters all slash commands.
   *
   * @return {Collection<string, SlashCommand>} - The updated commands map.
   */
  public unregisterAllCommands(): Collection<string, SlashCommand> {
    this.commands.clear();
    return this.commands;
  }

  /**
   * Deploys the commands to the API application and returns the result.
   *
   * @return {Promise<RESTPutAPIApplicationCommandsResult>} The result of the deployment.
   */
  public async deployCommands(): Promise<RESTPutAPIApplicationCommandsResult> {
    const commands = [...this.commands.values()].map((command) =>
      command.builder.toJSON(),
    );

    const response =
      await this.api.applicationCommands.bulkOverwriteGlobalCommands(
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
   * @return {Promise<{
   *    response: Promise<APIInteractionResponse | Response | FormData>,
   *    handling: Promise<void>
   * }>} - An object containing a promise for the response and a promise for handling.
   */
  public async handleInteraction(request: Request): Promise<{
    response: Promise<APIInteractionResponse | Response | FormData>;
    handling: Promise<void>;
  }> {
    const body = await request.clone().text();

    const signature = request.headers.get('X-Signature-Ed25519');
    const timestamp = request.headers.get('X-Signature-Timestamp');

    if (!signature || !timestamp) {
      return {
        response: Promise.resolve(
          new Response(
            JSON.stringify({
              error: true,
              message: 'Missing signature or timestamp',
            }),
            { status: 401 },
          ),
        ),
        handling: Promise.resolve(),
      };
    }

    const isValid = verifyKey(
      body,
      signature,
      timestamp,
      this.options.application.publicKey,
    );
    if (!isValid) {
      return {
        response: Promise.resolve(
          new Response(
            JSON.stringify({
              error: true,
              message: 'Interaction failed to verify',
            }),
            { status: 401 },
          ),
        ),
        handling: Promise.resolve(),
      };
    }

    let response: Promise<Response | FormData>;
    const handling = new Promise<void>(async (resolve, reject) => {
      const data = (await request.json()) as APIInteraction;

      response = new Promise<Response | FormData>(async (resolve, reject) => {
        try {
          await this.handleInteractionRequest(data, resolve);
        } catch (error) {
          reject(error);
        }
      });

      try {
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    return {
      // @ts-expect-error - will fix later
      response,
      handling,
    };
  }

  /**
   * Handles the interaction request.
   *
   * @param {APIInteraction} data - The interaction data.
   * @param {(value: Response | FormData | PromiseLike<Response | FormData>) => void} resolve - The resolve function.
   */
  private async handleInteractionRequest(
    data: APIInteraction,
    resolve: (
      value: Response | FormData | PromiseLike<Response | FormData>,
    ) => void,
  ) {
    if (data.type === InteractionType.Ping) {
      resolve(
        new Response(JSON.stringify({ type: InteractionResponseType.PONG })),
      );
    }

    if (data.type === InteractionType.ApplicationCommand) {
      const command = this.commands.get(data.data.name);
      if (!command) {
        resolve(
          new Response(
            JSON.stringify({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            }),
          ),
        );
        return;
      }

      const context = new CommandContext(this.api.interactions, data);

      for await (const middleware of this.middlewares.command) {
        // @ts-expect-error - ts(2345)
        await middleware(context);
      }

      await command.execute(context);

      resolve(
        new Response(
          JSON.stringify({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          }),
        ),
      );
    }

    if (data.type === InteractionType.MessageComponent) {
      const component = this.components.get(data.data.custom_id);
      if (!component) {
        resolve(
          new Response(
            JSON.stringify({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            }),
          ),
        );
        return;
      }

      const context = new ComponentContext(this.api.interactions, data);

      for await (const middleware of this.middlewares.component) {
        // @ts-expect-error - ts(2345)
        await middleware(context);
      }

      await component.execute(context);

      resolve(
        new Response(
          JSON.stringify({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          }),
        ),
      );
    }
  }
}
