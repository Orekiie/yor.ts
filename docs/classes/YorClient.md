[yor.ts](../README.md) / [Exports](../modules.md) / YorClient

# Class: YorClient

## Table of contents

### Constructors

- [constructor](YorClient.md#constructor)

### Properties

- [api](YorClient.md#api)
- [commands](YorClient.md#commands)
- [components](YorClient.md#components)
- [middlewares](YorClient.md#middlewares)
- [options](YorClient.md#options)
- [rest](YorClient.md#rest)

### Methods

- [createMiddleware](YorClient.md#createmiddleware)
- [deployCommands](YorClient.md#deploycommands)
- [handleInteraction](YorClient.md#handleinteraction)
- [handleInteractionRequest](YorClient.md#handleinteractionrequest)
- [registerCommand](YorClient.md#registercommand)
- [registerCommands](YorClient.md#registercommands)
- [registerComponent](YorClient.md#registercomponent)
- [registerComponents](YorClient.md#registercomponents)
- [unregisterAllCommands](YorClient.md#unregisterallcommands)
- [unregisterCommand](YorClient.md#unregistercommand)
- [unregisterCommands](YorClient.md#unregistercommands)
- [unregisterComponent](YorClient.md#unregistercomponent)
- [unregisterComponents](YorClient.md#unregistercomponents)

## Constructors

### constructor

• **new YorClient**(`options`): [`YorClient`](YorClient.md)

Creates a new instance of the class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`YorClientOptions`](../interfaces/YorClientOptions.md) | The configuration options for the client. |

#### Returns

[`YorClient`](YorClient.md)

#### Defined in

[src/structures/YorClient.ts:70](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L70)

## Properties

### api

• **api**: `API`

#### Defined in

[src/structures/YorClient.ts:58](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L58)

___

### commands

• `Readonly` **commands**: `Collection`\<`string`, [`SlashCommand`](SlashCommand.md)\>

#### Defined in

[src/structures/YorClient.ts:51](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L51)

___

### components

• `Readonly` **components**: `Collection`\<`string`, [`YorInteractionComponent`](YorInteractionComponent.md)\>

#### Defined in

[src/structures/YorClient.ts:52](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L52)

___

### middlewares

• **middlewares**: `Record`\<[`MiddlewareFunctionNames`](../modules.md#middlewarefunctionnames), ((`context`: [`CommandContext`](CommandContext.md)) => `void` \| `Promise`\<`void`\> \| (`context`: [`ComponentContext`](ComponentContext.md)) => `void` \| `Promise`\<`void`\> \| (`context`: [`ModalContext`](ModalContext.md)) => `void` \| `Promise`\<`void`\> \| (`context`: [`AutocompleteCommandContext`](AutocompleteCommandContext.md)) => `void` \| `Promise`\<`void`\>)[]\>

#### Defined in

[src/structures/YorClient.ts:60](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L60)

___

### options

• `Readonly` **options**: [`YorClientOptions`](../interfaces/YorClientOptions.md)

#### Defined in

[src/structures/YorClient.ts:50](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L50)

___

### rest

• **rest**: `REST`

#### Defined in

[src/structures/YorClient.ts:57](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L57)

## Methods

### createMiddleware

▸ **createMiddleware**\<`T`\>(`name`, `middleware`): `void`

Creates middleware for a given name and adds it to the middlewares array.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MiddlewareFunctionNames`](../modules.md#middlewarefunctionnames) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `T` | The name of the middleware. |
| `middleware` | [`MiddlewareFunction`](../modules.md#middlewarefunction)\<`T`\> | The middleware function. |

#### Returns

`void`

#### Defined in

[src/structures/YorClient.ts:256](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L256)

___

### deployCommands

▸ **deployCommands**(): `Promise`\<`RESTPutAPIApplicationCommandsResult`\>

Deploys the commands to the API application and returns the result.

#### Returns

`Promise`\<`RESTPutAPIApplicationCommandsResult`\>

The result of the deployment.

#### Defined in

[src/structures/YorClient.ts:167](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L167)

___

### handleInteraction

▸ **handleInteraction**(`request`): `Promise`\<\{ `handling`: `Promise`\<`void`\> ; `response`: `Promise`\<`APIInteractionResponse` \| `Response` \| `FormData`\>  }\>

Handles an interaction request from the API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Request` | The request object containing the interaction data. |

#### Returns

`Promise`\<\{ `handling`: `Promise`\<`void`\> ; `response`: `Promise`\<`APIInteractionResponse` \| `Response` \| `FormData`\>  }\>

- An object containing a promise for the response and a promise for handling.

#### Defined in

[src/structures/YorClient.ts:272](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L272)

___

### handleInteractionRequest

▸ **handleInteractionRequest**(`data`, `resolve`): `Promise`\<`void`\>

Handles the interaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `APIInteraction` | The interaction data. |
| `resolve` | (`value`: `Response` \| `FormData` \| `PromiseLike`\<`Response` \| `FormData`\>) => `void` | The resolve function. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/structures/YorClient.ts:349](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L349)

___

### registerCommand

▸ **registerCommand**(`command`): `Collection`\<`string`, [`SlashCommand`](SlashCommand.md)\>

Registers a slash command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `command` | [`SlashCommand`](SlashCommand.md) | The slash command to register. |

#### Returns

`Collection`\<`string`, [`SlashCommand`](SlashCommand.md)\>

- The updated commands collection.

#### Defined in

[src/structures/YorClient.ts:92](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L92)

___

### registerCommands

▸ **registerCommands**(`commands`): `Collection`\<`string`, [`SlashCommand`](SlashCommand.md)\>

Registers the provided slash commands.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commands` | [`SlashCommand`](SlashCommand.md)[] | The slash commands to register. |

#### Returns

`Collection`\<`string`, [`SlashCommand`](SlashCommand.md)\>

- The updated commands map.

#### Defined in

[src/structures/YorClient.ts:110](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L110)

___

### registerComponent

▸ **registerComponent**(`component`): `Collection`\<`string`, [`YorInteractionComponent`](YorInteractionComponent.md)\>

Registers a component in the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `component` | [`YorInteractionComponent`](YorInteractionComponent.md) | The component to register. |

#### Returns

`Collection`\<`string`, [`YorInteractionComponent`](YorInteractionComponent.md)\>

- The updated collection of components.

#### Defined in

[src/structures/YorClient.ts:186](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L186)

___

### registerComponents

▸ **registerComponents**(`components`): `Collection`\<`string`, [`YorInteractionComponent`](YorInteractionComponent.md)\>

Registers the given components in the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `components` | [`YorInteractionComponent`](YorInteractionComponent.md)[] | The components to register. |

#### Returns

`Collection`\<`string`, [`YorInteractionComponent`](YorInteractionComponent.md)\>

- The updated collection of components.

#### Defined in

[src/structures/YorClient.ts:205](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L205)

___

### unregisterAllCommands

▸ **unregisterAllCommands**(): `Collection`\<`string`, [`SlashCommand`](SlashCommand.md)\>

Unregisters all slash commands.

#### Returns

`Collection`\<`string`, [`SlashCommand`](SlashCommand.md)\>

- The updated commands map.

#### Defined in

[src/structures/YorClient.ts:157](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L157)

___

### unregisterCommand

▸ **unregisterCommand**(`command`): `Collection`\<`string`, [`SlashCommand`](SlashCommand.md)\>

Unregisters a slash command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `command` | [`SlashCommand`](SlashCommand.md) | The slash command to unregister. |

#### Returns

`Collection`\<`string`, [`SlashCommand`](SlashCommand.md)\>

- The updated commands collection.

#### Defined in

[src/structures/YorClient.ts:130](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L130)

___

### unregisterCommands

▸ **unregisterCommands**(`commands`): `Collection`\<`string`, [`SlashCommand`](SlashCommand.md)\>

Unregisters the provided slash commands.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commands` | [`SlashCommand`](SlashCommand.md)[] | The slash commands to unregister. |

#### Returns

`Collection`\<`string`, [`SlashCommand`](SlashCommand.md)\>

- The updated commands map.

#### Defined in

[src/structures/YorClient.ts:143](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L143)

___

### unregisterComponent

▸ **unregisterComponent**(`component`): `Collection`\<`string`, [`YorInteractionComponent`](YorInteractionComponent.md)\>

Deletes the specified component from the collection and returns the updated collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `component` | [`YorInteractionComponent`](YorInteractionComponent.md) | The component to unregister. |

#### Returns

`Collection`\<`string`, [`YorInteractionComponent`](YorInteractionComponent.md)\>

- The updated collection of components.

#### Defined in

[src/structures/YorClient.ts:226](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L226)

___

### unregisterComponents

▸ **unregisterComponents**(`components`): `Collection`\<`string`, [`YorInteractionComponent`](YorInteractionComponent.md)\>

Unregisters components from the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `components` | [`YorInteractionComponent`](YorInteractionComponent.md)[] | The components to unregister. |

#### Returns

`Collection`\<`string`, [`YorInteractionComponent`](YorInteractionComponent.md)\>

- The updated components collection.

#### Defined in

[src/structures/YorClient.ts:240](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L240)
