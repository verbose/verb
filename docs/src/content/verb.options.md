---
name: Verb Options
descriptions: Currently supported options that may defined on the `verb.options` object.
---

To become familiarized with how to get and set options with verb, see the [Options API][options-api] documentation.

### options.toc

Generate a markdown table of contents using [markdown-toc][].

Type: `boolean` | `object`

Default: `undefined`

**Object**

When defined as an object, the following sub-options may be defined:

* `render`
  - If `true`, a toc string will be added to the `view.data.toc` property on any views that have a `<!!-- toc -->` tag defined. 
  - If `false`, all `<!!-- toc -->` tags will simply be stripped, and no TOC will be created. This allows the tag to be added to a document, and rendering and insertion to be controlled programmatically.
* `insert`
  - If `true`, the Table of Contents value stored in `view.data.toc` will be inserted into the document by a built-in `postLayout` middleware. 
  - If `false`, the middleware will simply ignore the `view.data.toc` value and continue. 

_(Note that since `view.data.toc` is a value on the context, TOCs may also/alternatively be inserted via helper or template variable)_.

**Boolean**

When `options.toc` is either true or false, the option is converted to an object before being passed to [template-toc][], and both the `render` and `insert` options will be defined using the given value.

For example, `{toc: false}` normalizes to `{toc: {insert: false, render: false}}`.

**Examples**

As a boolean:

```js
var verb = require('verb');
var app = verb();

app.option('toc', true);
// or "app.enable('toc');"
```

As an object:

```js
app.option({toc: {insert: false, render: true}});
```

**view.options**

Note that, as with most options, `toc` options may also be defined on `view.options`:

```js
var app = verb();

app.create('pages');
app.pages.addView('foo', {content: 'bar', options: {toc: false}});
```

[options-api]: ./options-api.md
[markdown-toc]: https://github.com/jonschlinkert/markdown-toc