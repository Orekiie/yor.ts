[yor.ts](../README.md) / [Exports](../modules.md) / Command

# Interface: Command

## Implemented by

- [`SlashCommand`](../classes/SlashCommand.md)

## Table of contents

### Properties

- [builder](Command.md#builder)
- [execute](Command.md#execute)

## Properties

### builder

• **builder**: `SlashCommandBuilder`

#### Defined in

src/interfaces/Command.ts:6

___

### execute

• **execute**: (`context`: [`CommandContext`](../classes/CommandContext.md)) => `void` \| `Promise`\<`void`\>

#### Type declaration

▸ (`context`): `void` \| `Promise`\<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`CommandContext`](../classes/CommandContext.md) |

##### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

src/interfaces/Command.ts:7
