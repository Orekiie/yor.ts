[yor.ts](README.md) / Exports

# yor.ts

## Table of contents

### Classes

- [AutocompleteCommandContext](classes/AutocompleteCommandContext.md)
- [Channel](classes/Channel.md)
- [CommandContext](classes/CommandContext.md)
- [ComponentContext](classes/ComponentContext.md)
- [ModalContext](classes/ModalContext.md)
- [WebhookClient](classes/WebhookClient.md)
- [YorClient](classes/YorClient.md)
- [YorClientError](classes/YorClientError.md)
- [YorInteractionComponent](classes/YorInteractionComponent.md)
- [YorInteractionModal](classes/YorInteractionModal.md)
- [YorSlashCommand](classes/YorSlashCommand.md)

### Interfaces

- [Command](interfaces/Command.md)
- [Component](interfaces/Component.md)
- [Modal](interfaces/Modal.md)
- [YorClientOptions](interfaces/YorClientOptions.md)

### Type Aliases

- [MiddlewareFunction](modules.md#middlewarefunction)
- [MiddlewareFunctionNames](modules.md#middlewarefunctionnames)
- [WebhookClientOptions](modules.md#webhookclientoptions)

## Type Aliases

### MiddlewareFunction

Ƭ **MiddlewareFunction**\<`T`\>: `T` extends ``"command"`` ? (`context`: [`CommandContext`](classes/CommandContext.md)) => `Promise`\<`void`\> \| `void` : `T` extends ``"component"`` ? (`context`: [`ComponentContext`](classes/ComponentContext.md)) => `Promise`\<`void`\> \| `void` : `T` extends ``"modal"`` ? (`context`: [`ModalContext`](classes/ModalContext.md)) => `Promise`\<`void`\> \| `void` : `T` extends ``"autocomplete"`` ? (`context`: [`AutocompleteCommandContext`](classes/AutocompleteCommandContext.md)) => `Promise`\<`void`\> \| `void` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MiddlewareFunctionNames`](modules.md#middlewarefunctionnames) |

#### Defined in

[src/structures/YorClient.ts:39](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L39)

___

### MiddlewareFunctionNames

Ƭ **MiddlewareFunctionNames**: ``"command"`` \| ``"component"`` \| ``"modal"`` \| ``"autocomplete"``

#### Defined in

[src/structures/YorClient.ts:33](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorClient.ts#L33)

___

### WebhookClientOptions

Ƭ **WebhookClientOptions**\<`T`\>: `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| \{ `id`: `string` ; `token`: `string`  } |

#### Defined in

[src/structures/WebhookClient.ts:6](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/WebhookClient.ts#L6)
