[yor.ts](../README.md) / [Exports](../modules.md) / WebhookClient

# Class: WebhookClient\<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| \{ `id`: `string` ; `token`: `string`  } |

## Table of contents

### Constructors

- [constructor](WebhookClient.md#constructor)

### Properties

- [API](WebhookClient.md#api)
- [id](WebhookClient.md#id)
- [token](WebhookClient.md#token)

### Methods

- [send](WebhookClient.md#send)

## Constructors

### constructor

• **new WebhookClient**\<`T`\>(`options`): [`WebhookClient`](WebhookClient.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| \{ `id`: `string` ; `token`: `string`  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `T` |

#### Returns

[`WebhookClient`](WebhookClient.md)\<`T`\>

#### Defined in

[src/structures/WebhookClient.ts:16](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/WebhookClient.ts#L16)

## Properties

### API

• `Private` **API**: `WebhooksAPI`

#### Defined in

[src/structures/WebhookClient.ts:14](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/WebhookClient.ts#L14)

___

### id

• `Readonly` **id**: `string`

#### Defined in

[src/structures/WebhookClient.ts:11](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/WebhookClient.ts#L11)

___

### token

• `Readonly` **token**: `string`

#### Defined in

[src/structures/WebhookClient.ts:12](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/WebhookClient.ts#L12)

## Methods

### send

▸ **send**(`data`): `Promise`\<`void`\>

Sends the provided data using the API's `execute` method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `RESTPostAPIWebhookWithTokenJSONBody` & `RESTPostAPIWebhookWithTokenQuery` & \{ `files?`: `RawFile`[] ; `wait?`: ``false``  } | The data to be sent. |

#### Returns

`Promise`\<`void`\>

A promise that resolves to the result of the `execute` method.

#### Defined in

[src/structures/WebhookClient.ts:45](https://github.com/OreOreki/yor.ts/blob/f601845/src/structures/WebhookClient.ts#L45)
