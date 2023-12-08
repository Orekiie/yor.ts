[yor.ts](../README.md) / [Exports](../modules.md) / SlashCommand

# Class: SlashCommand

## Implements

- [`Command`](../interfaces/Command.md)

## Table of contents

### Constructors

- [constructor](SlashCommand.md#constructor)

### Properties

- [builder](SlashCommand.md#builder)
- [execute](SlashCommand.md#execute)

## Constructors

### constructor

• **new SlashCommand**(): [`SlashCommand`](SlashCommand.md)

#### Returns

[`SlashCommand`](SlashCommand.md)

## Properties

### builder

• **builder**: `SlashCommandBuilder`

#### Implementation of

[Command](../interfaces/Command.md).[builder](../interfaces/Command.md#builder)

#### Defined in

src/structures/SlashCommand.ts:8

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

src/structures/SlashCommand.ts:9
