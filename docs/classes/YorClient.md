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
- [modals](YorClient.md#modals)
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
- [registerModal](YorClient.md#registermodal)
- [registerModals](YorClient.md#registermodals)
- [unregisterAllCommands](YorClient.md#unregisterallcommands)
- [unregisterCommand](YorClient.md#unregistercommand)
- [unregisterCommands](YorClient.md#unregistercommands)
- [unregisterComponent](YorClient.md#unregistercomponent)
- [unregisterComponents](YorClient.md#unregistercomponents)
- [unregisterModal](YorClient.md#unregistermodal)
- [unregisterModals](YorClient.md#unregistermodals)

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

[src/structures/YorClient.ts:72](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L72)

## Properties

### api

• **api**: `API`

#### Defined in

[src/structures/YorClient.ts:60](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L60)

___

### commands

• `Readonly` **commands**: `Collection`\<`string`, [`YorSlashCommand`](YorSlashCommand.md)\>

#### Defined in

[src/structures/YorClient.ts:52](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L52)

___

### components

• `Readonly` **components**: `Collection`\<`string`, [`YorInteractionComponent`](YorInteractionComponent.md)\>

#### Defined in

[src/structures/YorClient.ts:53](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L53)

___

### middlewares

• **middlewares**: `Record`\<[`MiddlewareFunctionNames`](../modules.md#middlewarefunctionnames), ((`context`: [`CommandContext`](CommandContext.md)) => `void` \| `Promise`\<`void`\> \| (`context`: [`ComponentContext`](ComponentContext.md)) => `void` \| `Promise`\<`void`\> \| (`context`: [`ModalContext`](ModalContext.md)) => `void` \| `Promise`\<`void`\> \| (`context`: [`AutocompleteCommandContext`](AutocompleteCommandContext.md)) => `void` \| `Promise`\<`void`\>)[]\>

#### Defined in

[src/structures/YorClient.ts:62](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L62)

___

### modals

• `Readonly` **modals**: `Collection`\<`string`, [`YorInteractionModal`](YorInteractionModal.md)\>

#### Defined in

[src/structures/YorClient.ts:57](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L57)

___

### options

• `Readonly` **options**: [`YorClientOptions`](../interfaces/YorClientOptions.md)

#### Defined in

[src/structures/YorClient.ts:51](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L51)

___

### rest

• **rest**: `REST`

#### Defined in

[src/structures/YorClient.ts:59](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L59)

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

[src/structures/YorClient.ts:324](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L324)

___

### deployCommands

▸ **deployCommands**(): `Promise`\<`RESTPutAPIApplicationCommandsResult`\>

Deploys the commands to the API application and returns the result.

#### Returns

`Promise`\<`RESTPutAPIApplicationCommandsResult`\>

The result of the deployment.

#### Defined in

[src/structures/YorClient.ts:169](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L169)

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

[src/structures/YorClient.ts:340](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L340)

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

[src/structures/YorClient.ts:417](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L417)

___

### registerCommand

▸ **registerCommand**(`command`): `Collection`\<`string`, [`YorSlashCommand`](YorSlashCommand.md)\>

Registers a slash command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `command` | [`YorSlashCommand`](YorSlashCommand.md) | The slash command to register. |

#### Returns

`Collection`\<`string`, [`YorSlashCommand`](YorSlashCommand.md)\>

- The updated commands collection.

#### Defined in

[src/structures/YorClient.ts:94](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L94)

___

### registerCommands

▸ **registerCommands**(`commands`): `Collection`\<`string`, [`YorSlashCommand`](YorSlashCommand.md)\>

Registers the provided slash commands.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commands` | [`YorSlashCommand`](YorSlashCommand.md)[] | The slash commands to register. |

#### Returns

`Collection`\<`string`, [`YorSlashCommand`](YorSlashCommand.md)\>

- The updated commands map.

#### Defined in

[src/structures/YorClient.ts:112](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L112)

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

[src/structures/YorClient.ts:188](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L188)

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

[src/structures/YorClient.ts:207](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L207)

___

### registerModal

▸ **registerModal**(`modal`): `Collection`\<`string`, [`YorInteractionModal`](YorInteractionModal.md)\>

Registers a modal in the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modal` | [`YorInteractionModal`](YorInteractionModal.md) | The modal to be registered. |

#### Returns

`Collection`\<`string`, [`YorInteractionModal`](YorInteractionModal.md)\>

- The updated collection of modals.

#### Defined in

[src/structures/YorClient.ts:258](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L258)

___

### registerModals

▸ **registerModals**(`modals`): `Collection`\<`string`, [`YorInteractionModal`](YorInteractionModal.md)\>

Registers the given modals in the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modals` | [`YorInteractionModal`](YorInteractionModal.md)[] | The modals to be registered. |

#### Returns

`Collection`\<`string`, [`YorInteractionModal`](YorInteractionModal.md)\>

- The updated collection of modals.

#### Defined in

[src/structures/YorClient.ts:275](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L275)

___

### unregisterAllCommands

▸ **unregisterAllCommands**(): `Collection`\<`string`, [`YorSlashCommand`](YorSlashCommand.md)\>

Unregisters all slash commands.

#### Returns

`Collection`\<`string`, [`YorSlashCommand`](YorSlashCommand.md)\>

- The updated commands map.

#### Defined in

[src/structures/YorClient.ts:159](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L159)

___

### unregisterCommand

▸ **unregisterCommand**(`command`): `Collection`\<`string`, [`YorSlashCommand`](YorSlashCommand.md)\>

Unregisters a slash command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `command` | [`YorSlashCommand`](YorSlashCommand.md) | The slash command to unregister. |

#### Returns

`Collection`\<`string`, [`YorSlashCommand`](YorSlashCommand.md)\>

- The updated commands collection.

#### Defined in

[src/structures/YorClient.ts:132](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L132)

___

### unregisterCommands

▸ **unregisterCommands**(`commands`): `Collection`\<`string`, [`YorSlashCommand`](YorSlashCommand.md)\>

Unregisters the provided slash commands.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commands` | [`YorSlashCommand`](YorSlashCommand.md)[] | The slash commands to unregister. |

#### Returns

`Collection`\<`string`, [`YorSlashCommand`](YorSlashCommand.md)\>

- The updated commands map.

#### Defined in

[src/structures/YorClient.ts:145](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L145)

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

[src/structures/YorClient.ts:228](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L228)

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

[src/structures/YorClient.ts:242](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L242)

___

### unregisterModal

▸ **unregisterModal**(`modal`): `Collection`\<`string`, [`YorInteractionModal`](YorInteractionModal.md)\>

Deletes the specified modal from the collection and returns the updated collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modal` | [`YorInteractionModal`](YorInteractionModal.md) | The modal to unregister. |

#### Returns

`Collection`\<`string`, [`YorInteractionModal`](YorInteractionModal.md)\>

- The updated collection of modals.

#### Defined in

[src/structures/YorClient.ts:294](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L294)

___

### unregisterModals

▸ **unregisterModals**(`modals`): `Collection`\<`string`, [`YorInteractionModal`](YorInteractionModal.md)\>

Unregisters modals from the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modals` | [`YorInteractionModal`](YorInteractionModal.md)[] | The modals to unregister. |

#### Returns

`Collection`\<`string`, [`YorInteractionModal`](YorInteractionModal.md)\>

- The updated collection of modals.

#### Defined in

[src/structures/YorClient.ts:308](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L308)
