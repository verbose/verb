---
title: Config
---

Define verb configuration settings on the `verb` object in package.json. 

Also see the [CLI commands](cli-commands.md#config) documentation to learn how to set config values from the command line.

**Example**

```js
{
  "name": "my-project",
  "verb": {
    // verb config settings here
  }
}
```

### .cwd

Set the current working directory.

**Example**

```json
{
  "name": "my-project",
  "verb": {
    "cwd": "foo/bar"
  }
}
```

### .data

Merge data onto the `app.cache.data` object. 

**Example**

```json
{
  "name": "my-project",
  "verb": {
    "data": {
      "username": "jonschlinkert",
      "twitter": "jonschlinkert"
    }
  }
}
```

If the [base-data][] plugin is registered, this is the API-equivalent of calling `app.data()`.

### .engines

Register engines to use for rendering templates. Object-keys are used for the engine name, and the value can either be the module name, or an options object with the module name defined on the `name` property. 

**Prerequisites**

- ~~Requires [templates][], otherwise ignored~~ (included in verb by default)
- Modules must be locally installed and listed in `dependencies` or `devDependencies`

**Examples**

Key-value pairs, where the `key` is the name (or file extension) to associate with the engine, and the `value` is the module name to require: 

```json
{
  "name": "my-project",
  "verb": {
    "engines": {
      "*": "engine-base"
    }
  }
}
```

Objects, where the `key` is the name (or file extension) to associate with the engine, and the `value` is an options object to pass to the engine. 

_(When this format is used, the object must include a `name` property with the name of the module to require)_.

```json
{
  "name": "my-project",
  "verb": {
    "engines": {
      "*": {
        "name": "engine-base"
      }
    }
  }
}
```

### .engine

Alias for [engines](#engines)

### .helpers

Register helpers to be used in templates. Value can be a string or array of module names, glob patterns, file paths, or an object where each key is a filepath, glob or module name, and the value is an options object to pass to resolved helpers. 

**Prerequisites**

- ~~Requires [templates][], otherwise ignored~~ (included in verb by default)
- Modules must be locally installed and listed in `dependencies` or `devDependencies`

**Examples**

Module names:

```json
{
  "name": "my-project",
  "verb": {
    "helpers": {
      "helper-foo": {},
      "helper-bar": {}
    }
  }
}
```

Glob of helpers:

```json
{
  "name": "my-project",
  "verb": {
    "helpers": ["foo/*.js"]
  }
}
```

### .options

Merge options onto the `app.options` object. 

**Example**

```json
{
  "name": "my-project",
  "verb": {
    "options": {
      "foo": "bar"
    }
  }
}
```

If the [base-option][] plugin is registered, this is the API-equivalent of calling `app.option()`.

### .plugins

Load [pipeline plugins][plugins] to be used for transforming files in the `.src` string. 

**Prerequisites**

- ~~Requires the [base-pipeline][] plugin to be registered~~ (included in verb by default)
- Modules must be locally installed and listed in `dependencies` or `devDependencies`

**Example**

Defined as an array of plugin names:

```json
{
  "name": "my-project",
  "verb": {
    "plugins": ["gulp-eslint"]
  }
}
```

Defined as objects:

```json
{
  "name": "my-project",
  "verb": {
    "plugins": {
      "gulp-format-md": {},
      "gulp-eslint": {}
    }
  }
}
```

### .toc

Enable or disable Table of Contents rendering, or pass options to the [verb-toc][] library.

**Prerequisites**

- Requires the [verb-toc][] plugin to be registered. _This **Not** included in verb by default_.
- Modules must be locally installed and listed in `dependencies` or `devDependencies`

**Example**

```json
{
  "name": "my-project",
  "verb": {
    "toc": true
  }
}
```

### .use

Define plugins to load. Value can be a string or array of module names.

**Prerequisites**

- Modules must be locally installed and listed in `dependencies` or `devDependencies`

**Example**

```json
{
  "verb":  {
    "use": ["base-option", "base-data"]
  }
}
```

### .run

Always run tasks, regardless of additional command line flags that may have been passed.

**Example**

```json
{
  "verb":  {
    "run": true
  }
}
```

## Related

**Docs**

- [CLI commands](cli-commands.md)
- [data](data.md)
- [options](options.md)
- [plugins](plugins.md)

**Libraries**

- [base-data][]
- [base-option][]
- [base-pipeline][]
- [templates][]
- [verb-toc][]


[base-data]: https://github.com/node-base/base-data
[base-option]: https://github.com/node-base/base-option
[verb-toc]: https://github.com/verbose/verb-toc
[base-pipeline]: https://github.com/jonschlinkert/base-pipeline
[templates]: https://github.com/jonschlinkert/templates