[yor.ts](../README.md) / [Exports](../modules.md) / AutocompleteCommandContext

# Class: AutocompleteCommandContext

## Hierarchy

- `BaseContext`

  ↳ **`AutocompleteCommandContext`**

## Table of contents

### Constructors

- [constructor](AutocompleteCommandContext.md#constructor)

### Properties

- [API](AutocompleteCommandContext.md#api)
- [channel](AutocompleteCommandContext.md#channel)
- [raw](AutocompleteCommandContext.md#raw)

### Methods

- [decorate](AutocompleteCommandContext.md#decorate)

## Constructors

### constructor

• **new AutocompleteCommandContext**(`API`, `data`): [`AutocompleteCommandContext`](AutocompleteCommandContext.md)

Initializes a new instance of the APIApplicationCommandAutocompleteInteraction class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `API` | `API` | The API used to initialize the instance. |
| `data` | `APIApplicationCommandAutocompleteInteraction` | The data used to initialize the instance. |

#### Returns

[`AutocompleteCommandContext`](AutocompleteCommandContext.md)

#### Overrides

BaseContext.constructor

#### Defined in

[src/structures/Contexts/AutocompleteCommandContext.ts:23](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/AutocompleteCommandContext.ts#L23)

## Properties

### API

• `Private` **API**: `InteractionsAPI`

#### Defined in

[src/structures/Contexts/AutocompleteCommandContext.ts:11](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/AutocompleteCommandContext.ts#L11)

___

### channel

• **channel**: [`Channel`](Channel.md)

#### Defined in

[src/structures/Contexts/AutocompleteCommandContext.ts:15](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/AutocompleteCommandContext.ts#L15)

___

### raw

• `Readonly` **raw**: `APIApplicationCommandAutocompleteInteraction`

#### Defined in

[src/structures/Contexts/AutocompleteCommandContext.ts:13](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/AutocompleteCommandContext.ts#L13)

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

[src/structures/Contexts/BaseContext.ts:9](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/BaseContext.ts#L9)
