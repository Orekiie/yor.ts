[yor.ts](../README.md) / [Exports](../modules.md) / ModalContext

# Class: ModalContext

## Hierarchy

- `BaseContext`

  ↳ **`ModalContext`**

## Table of contents

### Constructors

- [constructor](ModalContext.md#constructor)

### Properties

- [raw](ModalContext.md#raw)

### Methods

- [decorate](ModalContext.md#decorate)

## Constructors

### constructor

• **new ModalContext**(`data`): [`ModalContext`](ModalContext.md)

Initializes a new instance of the constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `APIModalSubmitInteraction` | The data to initialize the instance with. |

#### Returns

[`ModalContext`](ModalContext.md)

#### Overrides

BaseContext.constructor

#### Defined in

src/structures/Contexts/ModalContext.ts:13

## Properties

### raw

• `Readonly` **raw**: `APIModalSubmitInteraction`

#### Defined in

src/structures/Contexts/ModalContext.ts:6

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
