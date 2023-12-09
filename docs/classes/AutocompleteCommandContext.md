[yor.ts](../README.md) / [Exports](../modules.md) / AutocompleteCommandContext

# Class: AutocompleteCommandContext

## Hierarchy

- `BaseContext`

  ↳ **`AutocompleteCommandContext`**

## Table of contents

### Constructors

- [constructor](AutocompleteCommandContext.md#constructor)

### Properties

- [raw](AutocompleteCommandContext.md#raw)

### Methods

- [decorate](AutocompleteCommandContext.md#decorate)

## Constructors

### constructor

• **new AutocompleteCommandContext**(`data`): [`AutocompleteCommandContext`](AutocompleteCommandContext.md)

Initializes a new instance of the APIApplicationCommandAutocompleteInteraction class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `APIApplicationCommandAutocompleteInteraction` | The data used to initialize the instance. |

#### Returns

[`AutocompleteCommandContext`](AutocompleteCommandContext.md)

#### Overrides

BaseContext.constructor

#### Defined in

src/structures/Contexts/AutocompleteCommandContext.ts:13

## Properties

### raw

• `Readonly` **raw**: `APIApplicationCommandAutocompleteInteraction`

#### Defined in

src/structures/Contexts/AutocompleteCommandContext.ts:6

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
