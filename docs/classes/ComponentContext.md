[yor.ts](../README.md) / [Exports](../modules.md) / ComponentContext

# Class: ComponentContext

## Table of contents

### Constructors

- [constructor](ComponentContext.md#constructor)

### Properties

- [API](ComponentContext.md#api)
- [id](ComponentContext.md#id)
- [raw](ComponentContext.md#raw)
- [token](ComponentContext.md#token)

### Methods

- [defer](ComponentContext.md#defer)

## Constructors

### constructor

• **new ComponentContext**(`API`, `data`): [`ComponentContext`](ComponentContext.md)

Creates a new instance of the constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `API` | `InteractionsAPI` | The API instance. |
| `data` | `APIMessageComponentInteraction` | The data for the constructor. |

#### Returns

[`ComponentContext`](ComponentContext.md)

#### Defined in

src/structures/Context.ts:150

## Properties

### API

• `Private` **API**: `InteractionsAPI`

#### Defined in

src/structures/Context.ts:142

___

### id

• `Readonly` **id**: `string`

#### Defined in

src/structures/Context.ts:139

___

### raw

• `Readonly` **raw**: `APIMessageComponentInteraction`

#### Defined in

src/structures/Context.ts:138

___

### token

• `Readonly` **token**: `string`

#### Defined in

src/structures/Context.ts:140

## Methods

### defer

▸ **defer**(`data`): `Promise`\<`void`\>

Defer a message update.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `undefined` \| `Pick`\<`RequestData`, ``"signal"``\> | The data for deferring the message update. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the message update is deferred.

#### Defined in

src/structures/Context.ts:164
