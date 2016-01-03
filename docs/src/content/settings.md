---
title: Settings
related: ['./recipes/3-ways-to-disable-toc']
---

There are multiple ways to define and manage configuration settings in {{name}}.

- `cli`: command line arguments
- `options`: in-memory options cache
- `data`: in-memory data cache
- `store`: global config store
- `config`: local {{name}} config, defined on the `{{name}}` property in package.json.
- `locals`: template locals, typically passed to the `render` method
- `helpers`: options can be passed as arguments to helpers
- `answers`: answer store
- `view.data`: front-matter
- `view.options`: 

**Why aren't these merged onto one big object?**

For a couple of reasons:

1. These objects aren't all available at the same time. For example, command line options might be used to determine which templates to render. We can use front-matter from templates once they're loaded, but not before.
1. Separation of concerns. This allows users to decide order of preference for conflicting options defined in more than one place.


## Local config

Configuration values may be stored on a project-by-project basis by adding a `verb` object to the project's package.json.

**Example**

```json
{
  "name": "my-project",
  "verb": {
    "layout": "default",
    "plugins": ["gulp-format-md"]
  }
}
```

## Global config store

**API**

Persist a global configuration value that may be used on any project:

```js
{{name}}.store.set('foo', 'bar');
```

Get a global configuration value:

```js
{{name}}.store.get('foo');
//=> 'bar'
```

**CLI**

Set a global config value via command line:

```sh
$ verb --set=foo:bar
```

Show the value in the command line:

```sh
$ verb --get=foo
# 'bar'
```

Or get the value programmatically:

```js
{{name}}.store.get('foo');
//=> 'bar'
```