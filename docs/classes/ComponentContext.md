[yor.ts](../README.md) / [Exports](../modules.md) / ComponentContext

# Class: ComponentContext

## Hierarchy

- `BaseContext`

  ↳ **`ComponentContext`**

## Table of contents

### Constructors

- [constructor](ComponentContext.md#constructor)

### Properties

- [API](ComponentContext.md#api)
- [id](ComponentContext.md#id)
- [raw](ComponentContext.md#raw)
- [token](ComponentContext.md#token)

### Methods

- [decorate](ComponentContext.md#decorate)
- [defer](ComponentContext.md#defer)
- [isButton](ComponentContext.md#isbutton)
- [isChannelSelectMenu](ComponentContext.md#ischannelselectmenu)
- [isMentionableSelectMenu](ComponentContext.md#ismentionableselectmenu)
- [isRoleSelectMenu](ComponentContext.md#isroleselectmenu)
- [isStringSelectMenu](ComponentContext.md#isstringselectmenu)
- [isUserSelectMenu](ComponentContext.md#isuserselectmenu)

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

#### Overrides

BaseContext.constructor

#### Defined in

[src/structures/Contexts/ComponentContext.ts:22](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L22)

## Properties

### API

• `Private` **API**: `InteractionsAPI`

#### Defined in

[src/structures/Contexts/ComponentContext.ts:14](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L14)

___

### id

• `Readonly` **id**: `string`

#### Defined in

[src/structures/Contexts/ComponentContext.ts:11](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L11)

___

### raw

• `Readonly` **raw**: `APIMessageComponentInteraction`

#### Defined in

[src/structures/Contexts/ComponentContext.ts:10](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L10)

___

### token

• `Readonly` **token**: `string`

#### Defined in

[src/structures/Contexts/ComponentContext.ts:12](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L12)

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

___

### defer

▸ **defer**(): `Promise`\<`void`\>

Defer a message update.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the message update is deferred.

#### Defined in

[src/structures/Contexts/ComponentContext.ts:37](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L37)

___

### isButton

▸ **isButton**(): `boolean`

Determines if the element is a button.

#### Returns

`boolean`

- Returns `true` if the element is a button, `false` otherwise.

#### Defined in

[src/structures/Contexts/ComponentContext.ts:46](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L46)

___

### isChannelSelectMenu

▸ **isChannelSelectMenu**(): `boolean`

Checks if the component is a channel select menu.

#### Returns

`boolean`

- Returns true if the component is a channel select menu, otherwise false.

#### Defined in

[src/structures/Contexts/ComponentContext.ts:64](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L64)

___

### isMentionableSelectMenu

▸ **isMentionableSelectMenu**(): `boolean`

Determines if the select menu is mentionable.

#### Returns

`boolean`

True if the select menu is mentionable, false otherwise.

#### Defined in

[src/structures/Contexts/ComponentContext.ts:73](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L73)

___

### isRoleSelectMenu

▸ **isRoleSelectMenu**(): `boolean`

Determines if the function is a role select menu.

#### Returns

`boolean`

True if the function is a role select menu, false otherwise.

#### Defined in

[src/structures/Contexts/ComponentContext.ts:82](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L82)

___

### isStringSelectMenu

▸ **isStringSelectMenu**(): `boolean`

Determines if the select menu is of type string.

#### Returns

`boolean`

true if the select menu is of type string, false otherwise

#### Defined in

[src/structures/Contexts/ComponentContext.ts:55](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L55)

___

### isUserSelectMenu

▸ **isUserSelectMenu**(): `boolean`

Determines whether the component type of the raw data is a UserSelect.

#### Returns

`boolean`

true if the component type is UserSelect, false otherwise

#### Defined in

[src/structures/Contexts/ComponentContext.ts:91](https://github.com/OreOreki/yor.ts/blob/dd9125a/src/structures/Contexts/ComponentContext.ts#L91)
