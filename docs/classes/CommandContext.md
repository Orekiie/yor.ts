[yor.ts](../README.md) / [Exports](../modules.md) / CommandContext

# Class: CommandContext

## Hierarchy

- `BaseContext`

  ↳ **`CommandContext`**

## Table of contents

### Constructors

- [constructor](CommandContext.md#constructor)

### Properties

- [API](CommandContext.md#api)
- [channel](CommandContext.md#channel)
- [deferred](CommandContext.md#deferred)
- [id](CommandContext.md#id)
- [raw](CommandContext.md#raw)
- [replied](CommandContext.md#replied)
- [subcommand](CommandContext.md#subcommand)
- [subcommandGroup](CommandContext.md#subcommandgroup)
- [token](CommandContext.md#token)

### Methods

- [decorate](CommandContext.md#decorate)
- [defer](CommandContext.md#defer)
- [deleteReply](CommandContext.md#deletereply)
- [editReply](CommandContext.md#editreply)
- [fetchReply](CommandContext.md#fetchreply)
- [followUp](CommandContext.md#followup)
- [getBooleanOption](CommandContext.md#getbooleanoption)
- [getChannelOption](CommandContext.md#getchanneloption)
- [getIntegerOption](CommandContext.md#getintegeroption)
- [getMemberOption](CommandContext.md#getmemberoption)
- [getNumberOption](CommandContext.md#getnumberoption)
- [getRoleOption](CommandContext.md#getroleoption)
- [getStringOption](CommandContext.md#getstringoption)
- [getUserOption](CommandContext.md#getuseroption)
- [inGuild](CommandContext.md#inguild)
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
| `data` | `APIChatInputApplicationCommandInteraction` | The data used to initialize the instance. |

#### Returns

[`CommandContext`](CommandContext.md)

#### Overrides

BaseContext.constructor

#### Defined in

src/structures/Contexts/CommandContext.ts:40

## Properties

### API

• `Private` **API**: `InteractionsAPI`

#### Defined in

src/structures/Contexts/CommandContext.ts:32

___

### channel

• **channel**: `undefined` \| \{ `flags?`: `ChannelFlags` ; `id`: `string` ; `name?`: ``null`` \| `string` ; `type`: `GuildText` \| `DM` \| `GuildVoice` \| `GroupDM` \| `GuildCategory` \| `GuildAnnouncement` \| `AnnouncementThread` \| `PublicThread` \| `PrivateThread` \| `GuildStageVoice` \| `GuildForum` \| `GuildMedia`  } & \{ `flags?`: `ChannelFlags` ; `id`: `string` ; `name?`: ``null`` \| `string` ; `type`: `GuildText` \| `DM` \| `GuildVoice` \| `GroupDM` \| `GuildCategory` \| `GuildAnnouncement` \| `AnnouncementThread` \| `PublicThread` \| `PrivateThread` \| `GuildStageVoice` \| `GuildForum` \| `GuildMedia`  }

#### Defined in

src/structures/Contexts/CommandContext.ts:24

___

### deferred

• **deferred**: `boolean` = `false`

#### Defined in

src/structures/Contexts/CommandContext.ts:29

___

### id

• **id**: `string`

#### Defined in

src/structures/Contexts/CommandContext.ts:23

___

### raw

• `Readonly` **raw**: `APIChatInputApplicationCommandInteraction`

#### Defined in

src/structures/Contexts/CommandContext.ts:21

___

### replied

• **replied**: `boolean` = `false`

#### Defined in

src/structures/Contexts/CommandContext.ts:30

___

### subcommand

• `Optional` **subcommand**: `APIApplicationCommandInteractionDataSubcommandOption`

#### Defined in

src/structures/Contexts/CommandContext.ts:27

___

### subcommandGroup

• `Optional` **subcommandGroup**: `APIApplicationCommandInteractionDataSubcommandGroupOption`

#### Defined in

src/structures/Contexts/CommandContext.ts:26

___

### token

• **token**: `string`

#### Defined in

src/structures/Contexts/CommandContext.ts:22

## Methods

### decorate

▸ **decorate**(`name`, `data`): `unknown`

Decorates the object with a new property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the property. |
| `data` | `unknown` | The data to assign to the property. |

#### Returns

`unknown`

The decorated object.

#### Inherited from

BaseContext.decorate

#### Defined in

src/structures/Contexts/BaseContext.ts:9

___

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

src/structures/Contexts/CommandContext.ts:66

___

### deleteReply

▸ **deleteReply**(): `Promise`\<`void`\>

Deletes a reply.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the reply is deleted.

#### Defined in

src/structures/Contexts/CommandContext.ts:121

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

src/structures/Contexts/CommandContext.ts:104

___

### fetchReply

▸ **fetchReply**(): `Promise`\<`APIMessage`\>

Fetches the reply asynchronously.

#### Returns

`Promise`\<`APIMessage`\>

A promise that resolves when the original reply is fetched.

#### Defined in

src/structures/Contexts/CommandContext.ts:130

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

src/structures/Contexts/CommandContext.ts:158

___

### getBooleanOption

▸ **getBooleanOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `boolean` : `boolean`

Retrieves a boolean option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? ``null`` \| `boolean` : `boolean`

- The value of the option, or null if the option is not found and not required.

#### Defined in

src/structures/Contexts/CommandContext.ts:345

___

### getChannelOption

▸ **getChannelOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? `APIInteractionDataResolvedChannel` : ``null`` \| `APIInteractionDataResolvedChannel`

Retrieves a channel option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? `APIInteractionDataResolvedChannel` : ``null`` \| `APIInteractionDataResolvedChannel`

- The value of the option, or null if the option is not found and not required.

#### Defined in

src/structures/Contexts/CommandContext.ts:513

___

### getIntegerOption

▸ **getIntegerOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `number` : `number`

Retrieves an integer option from the API.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | The index of the option. |
| `required?` | `T` | `undefined` | Whether the option is required or not. |

#### Returns

`T` extends ``true`` ? ``null`` \| `number` : `number`

- The value of the option.

#### Defined in

src/structures/Contexts/CommandContext.ts:291

___

### getMemberOption

▸ **getMemberOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? `APIInteractionDataResolvedGuildMember` : ``null`` \| `APIInteractionDataResolvedGuildMember`

Retrieves a user option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? `APIInteractionDataResolvedGuildMember` : ``null`` \| `APIInteractionDataResolvedGuildMember`

- The value of the option, or null if the option is not found and not required.

#### Defined in

src/structures/Contexts/CommandContext.ts:576

___

### getNumberOption

▸ **getNumberOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `number` : `number`

Retrieves a number option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? ``null`` \| `number` : `number`

- The value of the option, or null if the option is not found and not required.

#### Defined in

src/structures/Contexts/CommandContext.ts:237

___

### getRoleOption

▸ **getRoleOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `APIRole` : `APIRole`

Retrieves a role option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? ``null`` \| `APIRole` : `APIRole`

- The value of the option, or null if the option is not found and not required.

#### Defined in

src/structures/Contexts/CommandContext.ts:456

___

### getStringOption

▸ **getStringOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `string` : `string`

Retrieves a string option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? ``null`` \| `string` : `string`

- The value of the option, or null if the option is not found and not required.

#### Defined in

src/structures/Contexts/CommandContext.ts:181

___

### getUserOption

▸ **getUserOption**\<`T`\>(`name`, `index?`, `required?`): `T` extends ``true`` ? ``null`` \| `APIUser` : `APIUser`

Retrieves a user option from the command's options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the option to retrieve. |
| `index` | ``0`` \| ``2`` \| ``1`` | `0` | (Optional) The index of the option to retrieve. Defaults to 0. |
| `required?` | `T` | `undefined` | (Optional) Specifies if the option is required. Defaults to false. |

#### Returns

`T` extends ``true`` ? ``null`` \| `APIUser` : `APIUser`

- The value of the option, or null if the option is not found and not required.

#### Defined in

src/structures/Contexts/CommandContext.ts:399

___

### inGuild

▸ **inGuild**(): `boolean`

Checks if the instance is in a guild.

#### Returns

`boolean`

Returns true if the instance is in a guild, otherwise false.

#### Defined in

src/structures/Contexts/CommandContext.ts:169

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

src/structures/Contexts/CommandContext.ts:85

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

src/structures/Contexts/CommandContext.ts:140
