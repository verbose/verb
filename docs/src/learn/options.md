## metadata
Type: `object|array|string`

Default: `undefined`

* `string`: When defined as a string,

## variable
Type: `string`

Default: `undefined`

Lo-Dash opts...

## namespace
Type: `boolean|string`

Default: `undefined` (options: `true`|`"only"`)

When `namespace` defined, an object is created for each data file, where the top level property on the object is the name of the file itself, and the data contained within the file is extended into that object.

<!-- [See examples](#namespacing). -->

## omit

Omit properties from the context.

Type: `Array`

Default: `[]`

Returns: `Object`

Useful if properties are added via options, but should not be on the context.

## ext

Type: `String`

Default: `.md`

The file extension to use for all includes. In other words, `{%%= docs() %}`, `{%%= include() %}`, `{%%= raw() %}`, etc. all expect source files to have a `.md` extension.