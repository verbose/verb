---
title: <%= proper(name) %> CLI
description: "Working with <%= name %> from the command line."
related: ["terminology", "tasks", "features"]
tags: ['config', 'cli', 'command line', 'options', 'flags']
---

**CLI FAQ**

- Dot-notation may be used for most command line arguments
- In cases where dots should not be expanded to an object, you may escape the dot with a single backslash


## Summary

```
todo: generate/display CLI help here
```

## option


Set options to be used in plugins and middleware.

```sh
$ verb --option=<key>:<value>
# or
$ verb --option=<key>
```

- `key` The property to set
- `value`: the value of `key`. If no value is given, the value will be set to `true`


**Example**

Omit the Table of Contents when generating a document from a built-in verb template:

```sh
$ verb --option=toc:false
```

## config

Persist project-specific `config` values to the `verb` object in `package.json`. These values will override config settings defined anywhere else (accept for those passed via command line):

```sh
$ verb --config=<key><value>
```

### config examples

**Set the layout to use**

Use a verb [built-in layout](./built-in-templates.md#layouts) with `.verb.md` every time it's rendered: 

```sh
$ verb --config=layout:default
```

**Disable Table of Contents**

Disable the Table of Contents for all templates:

```sh
$ verb --config=option.toc:false
```

Disable the Table of Contents for a specific template:

```sh
$ verb --config=disable.toc:"foo\.md"
# remember to escape dots in filepaths!
```

Disable the Table of Contents for multiple templates:

_(TODO: implement me)_

```sh
$ verb --config=disable.toc:"foo\.md,bar\.md,baz\.md"
```
