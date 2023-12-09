[yor.ts](README.md) / Exports

# yor.ts

## Table of contents

### Classes

- [AutocompleteCommandContext](classes/AutocompleteCommandContext.md)
- [CommandContext](classes/CommandContext.md)
- [ComponentContext](classes/ComponentContext.md)
- [ModalContext](classes/ModalContext.md)
- [SlashCommand](classes/SlashCommand.md)
- [YorClient](classes/YorClient.md)
- [YorClientError](classes/YorClientError.md)
- [YorInteractionComponent](classes/YorInteractionComponent.md)

### Interfaces

- [Command](interfaces/Command.md)
- [Component](interfaces/Component.md)
- [YorClientOptions](interfaces/YorClientOptions.md)

### Type Aliases

- [MiddlewareFunction](modules.md#middlewarefunction)
- [MiddlewareFunctionNames](modules.md#middlewarefunctionnames)

## Type Aliases

### MiddlewareFunction

Ƭ **MiddlewareFunction**\<`T`\>: `T` extends ``"command"`` ? (`context`: [`CommandContext`](classes/CommandContext.md)) => `Promise`\<`void`\> \| `void` : `T` extends ``"component"`` ? (`context`: [`ComponentContext`](classes/ComponentContext.md)) => `Promise`\<`void`\> \| `void` : `T` extends ``"modal"`` ? (`context`: [`ModalContext`](classes/ModalContext.md)) => `Promise`\<`void`\> \| `void` : `T` extends ``"autocomplete"`` ? (`context`: [`AutocompleteCommandContext`](classes/AutocompleteCommandContext.md)) => `Promise`\<`void`\> \| `void` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MiddlewareFunctionNames`](modules.md#middlewarefunctionnames) |

#### Defined in

[src/structures/YorClient.ts:38](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L38)

___

### MiddlewareFunctionNames

Ƭ **MiddlewareFunctionNames**: ``"command"`` \| ``"component"`` \| ``"modal"`` \| ``"autocomplete"``

#### Defined in

[src/structures/YorClient.ts:32](https://github.com/OreOreki/interactions.ts/blob/2616a4b/src/structures/YorClient.ts#L32)