[yor.ts](../README.md) / [Exports](../modules.md) / YorSlashCommand

# Class: YorSlashCommand

## Implements

- [`Command`](../interfaces/Command.md)

## Table of contents

### Constructors

- [constructor](YorSlashCommand.md#constructor)

### Properties

- [autocomplete](YorSlashCommand.md#autocomplete)
- [builder](YorSlashCommand.md#builder)
- [execute](YorSlashCommand.md#execute)

## Constructors

### constructor

• **new YorSlashCommand**(): [`YorSlashCommand`](YorSlashCommand.md)

#### Returns

[`YorSlashCommand`](YorSlashCommand.md)

## Properties

### autocomplete

• **autocomplete**: (`context`: [`AutocompleteCommandContext`](AutocompleteCommandContext.md)) => `void` \| `Promise`\<`void`\>

#### Type declaration

▸ (`context`): `void` \| `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`AutocompleteCommandContext`](AutocompleteCommandContext.md) |

##### Returns

`void` \| `Promise`\<`void`\>

#### Implementation of

[Command](../interfaces/Command.md).[autocomplete](../interfaces/Command.md#autocomplete)

#### Defined in

[src/structures/YorSlashCommand.ts:11](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorSlashCommand.ts#L11)

___

### builder

• **builder**: `SlashCommandBuilder`

#### Implementation of

[Command](../interfaces/Command.md).[builder](../interfaces/Command.md#builder)

#### Defined in

[src/structures/YorSlashCommand.ts:9](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorSlashCommand.ts#L9)

___

### execute

• **execute**: (`context`: [`CommandContext`](CommandContext.md)) => `void` \| `Promise`\<`void`\>

#### Type declaration

▸ (`context`): `void` \| `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`CommandContext`](CommandContext.md) |

##### Returns

`void` \| `Promise`\<`void`\>

#### Implementation of

[Command](../interfaces/Command.md).[execute](../interfaces/Command.md#execute)

#### Defined in

[src/structures/YorSlashCommand.ts:10](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/YorSlashCommand.ts#L10)
