[yor.ts](../README.md) / [Exports](../modules.md) / Channel

# Class: Channel

## Table of contents

### Constructors

- [constructor](Channel.md#constructor)

### Properties

- [API](Channel.md#api)
- [flags](Channel.md#flags)
- [id](Channel.md#id)
- [name](Channel.md#name)
- [raw](Channel.md#raw)
- [type](Channel.md#type)

### Methods

- [bulkDeleteMessages](Channel.md#bulkdeletemessages)
- [createWebhook](Channel.md#createwebhook)
- [createdAt](Channel.md#createdat)
- [createdTimestamp](Channel.md#createdtimestamp)
- [delete](Channel.md#delete)
- [edit](Channel.md#edit)
- [fetchMessages](Channel.md#fetchmessages)
- [getWebhooks](Channel.md#getwebhooks)
- [isDMBased](Channel.md#isdmbased)
- [isTextBased](Channel.md#istextbased)
- [isThread](Channel.md#isthread)
- [isVoiceBased](Channel.md#isvoicebased)
- [pinMessage](Channel.md#pinmessage)
- [send](Channel.md#send)
- [toString](Channel.md#tostring)
- [unpinMessage](Channel.md#unpinmessage)

## Constructors

### constructor

• **new Channel**(`API`, `data`): [`Channel`](Channel.md)

Constructs a new instance of the class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `API` | `ChannelsAPI` | The ChannelsAPI instance. |
| `data` | `undefined` \| \{ `flags?`: `ChannelFlags` ; `id`: `string` ; `name?`: ``null`` \| `string` ; `type`: `GuildText` \| `DM` \| `GuildVoice` \| `GroupDM` \| `GuildCategory` \| `GuildAnnouncement` \| `AnnouncementThread` \| `PublicThread` \| `PrivateThread` \| `GuildStageVoice` \| `GuildForum` \| `GuildMedia`  } | The channel data. |

#### Returns

[`Channel`](Channel.md)

**`Throws`**

If channel data is not provided.

#### Defined in

[src/structures/Channel.ts:34](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L34)

## Properties

### API

• `Private` **API**: `ChannelsAPI`

#### Defined in

[src/structures/Channel.ts:25](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L25)

___

### flags

• `Optional` **flags**: `ChannelFlags`

#### Defined in

[src/structures/Channel.ts:21](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L21)

___

### id

• **id**: `string`

#### Defined in

[src/structures/Channel.ts:18](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L18)

___

### name

• **name**: `undefined` \| `string`

#### Defined in

[src/structures/Channel.ts:19](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L19)

___

### raw

• **raw**: `Partial`\<`APIChannel`\>

#### Defined in

[src/structures/Channel.ts:23](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L23)

___

### type

• **type**: `number`

#### Defined in

[src/structures/Channel.ts:20](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L20)

## Methods

### bulkDeleteMessages

▸ **bulkDeleteMessages**(`data`): `Promise`\<`void`\>

Bulk deletes messages

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string`[] | The data used to bulk delete messages |

#### Returns

`Promise`\<`void`\>

Promise that resolves when the messages are deleted

#### Defined in

[src/structures/Channel.ts:100](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L100)

___

### createWebhook

▸ **createWebhook**(`data`): `Promise`\<`APIWebhook`\>

Creates a webhook in the current channel or parent channel (if a thread) with the given data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `RESTPostAPIChannelWebhookJSONBody` & \{ `reason`: `string`  } | The data for creating the webhook. |

#### Returns

`Promise`\<`APIWebhook`\>

A promise that resolves with the created webhook.

#### Defined in

[src/structures/Channel.ts:211](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L211)

___

### createdAt

▸ **createdAt**(): `Date`

Returns the creation date of the object.

#### Returns

`Date`

The creation date of the object.

#### Defined in

[src/structures/Channel.ts:149](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L149)

___

### createdTimestamp

▸ **createdTimestamp**(): `number`

Returns the created timestamp as a Date object.

#### Returns

`number`

The created timestamp.

#### Defined in

[src/structures/Channel.ts:135](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L135)

___

### delete

▸ **delete**(): `Promise`\<`APIChannel`\>

Deletes the channel

#### Returns

`Promise`\<`APIChannel`\>

Promise that resolves to the deleted channel

#### Defined in

[src/structures/Channel.ts:78](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L78)

___

### edit

▸ **edit**(`data`): `Promise`\<`APIChannel`\>

Edits the channel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `RESTPatchAPIChannelJSONBody` | The data used to edit the channel |

#### Returns

`Promise`\<`APIChannel`\>

Promise that resolves to the edited channel

#### Defined in

[src/structures/Channel.ts:88](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L88)

___

### fetchMessages

▸ **fetchMessages**(`data`): `Promise`\<`APIMessage`[]\>

Fetches messages using the provided data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `undefined` \| `RESTGetAPIChannelMessagesQuery` | The data used to fetch messages. |

#### Returns

`Promise`\<`APIMessage`[]\>

A promise that resolves to an array of API messages.

#### Defined in

[src/structures/Channel.ts:67](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L67)

___

### getWebhooks

▸ **getWebhooks**(): `Promise`\<`APIWebhook`[]\>

Gets all webhooks in the current channel or parent channel (if a thread)

#### Returns

`Promise`\<`APIWebhook`[]\>

A promise that resolves with an array of webhooks.

#### Defined in

[src/structures/Channel.ts:236](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L236)

___

### isDMBased

▸ **isDMBased**(): `boolean`

Determines if the channel is DM-based.

#### Returns

`boolean`

- True if the channel is DM-based, false otherwise.

#### Defined in

[src/structures/Channel.ts:191](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L191)

___

### isTextBased

▸ **isTextBased**(): `boolean`

Checks if the function is text-based.

#### Returns

`boolean`

true if the function is text-based, false otherwise.

#### Defined in

[src/structures/Channel.ts:182](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L182)

___

### isThread

▸ **isThread**(): `boolean`

Checks if the channel type is a thread.

#### Returns

`boolean`

true if the channel type is a thread, false otherwise

#### Defined in

[src/structures/Channel.ts:158](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L158)

___

### isVoiceBased

▸ **isVoiceBased**(): `boolean`

Determines if the channel is voice-based.

#### Returns

`boolean`

Returns true if the channel is voice-based, false otherwise.

#### Defined in

[src/structures/Channel.ts:171](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L171)

___

### pinMessage

▸ **pinMessage**(`data`): `Promise`\<`void`\>

Pin a message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | The data used to pin a message |

#### Returns

`Promise`\<`void`\>

Promise that resolves when the message is pinned

#### Defined in

[src/structures/Channel.ts:112](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L112)

___

### send

▸ **send**(`data`): `Promise`\<`APIMessage`\>

Sends a message with the given data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `RESTPostAPIChannelMessageJSONBody` & \{ `files?`: `RawFile`[]  } | The data for the message. |

#### Returns

`Promise`\<`APIMessage`\>

A promise that resolves to the created message.

#### Defined in

[src/structures/Channel.ts:55](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L55)

___

### toString

▸ **toString**(): \`\<#$\{string}\>\`

Returns a string representation of the channel.

#### Returns

\`\<#$\{string}\>\`

The string representation of the channel.

#### Defined in

[src/structures/Channel.ts:200](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L200)

___

### unpinMessage

▸ **unpinMessage**(`data`): `Promise`\<`void`\>

Unpin a message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` | The data used to unpin a message |

#### Returns

`Promise`\<`void`\>

Promise that resolves when the message is unpinned

#### Defined in

[src/structures/Channel.ts:124](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/Channel.ts#L124)
