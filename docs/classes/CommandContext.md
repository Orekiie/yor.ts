[yor.ts](../README.md) / [Exports](../modules.md) / CommandContext

# Class: CommandContext

## Table of contents

### Constructors

- [constructor](CommandContext.md#constructor)

### Properties

- [API](CommandContext.md#api)
- [id](CommandContext.md#id)
- [raw](CommandContext.md#raw)
- [token](CommandContext.md#token)

### Methods

- [defer](CommandContext.md#defer)
- [deleteReply](CommandContext.md#deletereply)
- [editReply](CommandContext.md#editreply)
- [fetchReply](CommandContext.md#fetchreply)
- [followUp](CommandContext.md#followup)
- [reply](CommandContext.md#reply)
- [replyModal](CommandContext.md#replymodal)

## Constructors

### constructor

• **new CommandContext**(`API`, `data`): [`CommandContext`](CommandContext.md)

Constructs a new instance of the APIApplicationCommandInteractionData class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `API` | `InteractionsAPI` | The API used to initialize the instance. |
| `data` | `APIApplicationCommandInteraction` | The data used to initialize the instance. |

#### Returns

[`CommandContext`](CommandContext.md)

#### Defined in

src/structures/Context.ts:24

## Properties

### API

• `Private` **API**: `InteractionsAPI`

#### Defined in

src/structures/Context.ts:16

___

### id

• **id**: `string`

#### Defined in

src/structures/Context.ts:14

___

### raw

• `Readonly` **raw**: `APIApplicationCommandInteraction`

#### Defined in

src/structures/Context.ts:12

___

### token

• **token**: `string`

#### Defined in

src/structures/Context.ts:13

## Methods

### defer

▸ **defer**(`ephemeral?`): `Promise`\<`void`\>

Defers the execution of the function.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ephemeral` | `boolean` | `false` | Whether the message is ephemeral or not. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the deferral is complete.

#### Defined in

src/structures/Context.ts:38

___

### deleteReply

▸ **deleteReply**(): `Promise`\<`void`\>

Deletes a reply.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the reply is deleted.

#### Defined in

src/structures/Context.ts:73

___

### editReply

▸ **editReply**(`data`): `Promise`\<`APIMessage`\>

Edits a reply.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Omit`\<`RESTPostAPIWebhookWithTokenJSONBody`, ``"username"`` \| ``"avatar_url"``\> & \{ `flags?`: `MessageFlags`  } & \{ `files?`: `RawFile`[]  } | The data for editing the reply. |

#### Returns

`Promise`\<`APIMessage`\>

A promise that resolves when the reply is edited.

#### Defined in

src/structures/Context.ts:62

___

### fetchReply

▸ **fetchReply**(): `Promise`\<`APIMessage`\>

Fetches the reply asynchronously.

#### Returns

`Promise`\<`APIMessage`\>

A promise that resolves when the original reply is fetched.

#### Defined in

src/structures/Context.ts:82

___

### followUp

▸ **followUp**(`data`): `Promise`\<`APIMessage`\>

Calls the followUp method of the API class with the provided data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Omit`\<`RESTPostAPIWebhookWithTokenJSONBody`, ``"username"`` \| ``"avatar_url"``\> & \{ `flags?`: `MessageFlags`  } & \{ `files?`: `RawFile`[]  } | The data to be passed to the followUp method. |

#### Returns

`Promise`\<`APIMessage`\>

A promise that resolves to an APIMessage object.

#### Defined in

src/structures/Context.ts:104

___

### reply

▸ **reply**(`data`): `Promise`\<`void`\>

A description of the entire function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Omit`\<`RESTPostAPIWebhookWithTokenJSONBody`, ``"username"`` \| ``"avatar_url"``\> & \{ `flags?`: `MessageFlags`  } & \{ `files?`: `RawFile`[]  } | description of the data parameter |

#### Returns

`Promise`\<`void`\>

description of the return value

#### Defined in

src/structures/Context.ts:50

___

### replyModal

▸ **replyModal**(`data`): `Promise`\<`void`\>

Reply to a modal.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `APIModalInteractionResponseCallbackData` | The data for creating the modal. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the modal is created.

#### Defined in

src/structures/Context.ts:92
