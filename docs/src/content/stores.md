---
title: Stores 
---

Verb supports 4 "types" of stores for persisting config values, each is persisted to the `~/.data-store` directory, and all three have API methods for getting/setting data:

## Store comparison

The first 3 types are stored in user home: `~/.data-store`, the last type "local configs", is stored locally to a project.

**Type** | **API** | **Description**
--- | --- | ---
Global defaults | `app.globals` | Generic global defaults, persisted to `~/.data-store/globals/defaults.json`. These defaults are shared by `verb`, `assemble`, `update` and `generate`. 
Verb defaults | `app.store` | Verb-specific defaults, persisted to `~/.data-store/app/verb.json`
Project defaults | `app.locals` | Project-specific defaults, persisted to `~/.data-store/project/foo-bar.json`. 
Local configs | N/A | Project-specific configuration settings in `verb.json` or the `verb` object in package.json. 

## How config works

Specific data "wins" over general data. 

```sh
global
  # "app" wins over "global"
  L app
    # "project" wins over "app"
    L project 
      # "local" wins over "project"
      L local (verb.json)
      L local (package.json)
        # Anything explicitly passed on the API should win
        L API 
```

### Peristed config

Config stores are persisted according the following conventions:

- **globals**: `~/.data-store/globals/defaults.json`
- **app**: `~/.data-store/app/{app-name}.json`
- **project**: `~/.data-store/app/{app-name}/projects/{project-name}.json`


**Examples**

```sh
# global defaults 
~/.data-store/globals/defaults.json

# app-specific defaults (app => verb)
~/.data-store/app/verb.json

# verb project configs
~/.data-store/app/verb/projects/foo.json
~/.data-store/app/verb/projects/bar.json
~/.data-store/app/verb/projects/baz.json
```


## Global defaults

Global defaults are shared across all "apps" and are persisted to:

```sh
~/.data-store/globals/defaults.json
```

**Best for**

Generic data that can be used in any project, such as "author" `data` to be passed on the context when rendering docs or project readmes:

```json
{
  "data": {
    "username": "jonschlinkert",
    "twitter": "jonschlinkert",
    "author": {
      "name": "Jon Schlinkert",
      "url": "https://github.com/jonschlinkert"
    }
  }
}
```

## Verb defaults

App-specific defaults are persisted to:

```sh
~/.data-store/app/verb.json
```

**Best for**

Verb-specific configuration settings. For example, you might have certain preferences that should always be used (unless overridden), like:

```json
{
  "toc": true,
  "layout": "default"
}
```

## Project defaults

Project stores are specific to the "app" being run. In this case, `verb` is the app, so project-specific configuration settings are persisted as follows:

```sh
# app-specific defaults (app => verb)
~/.data-store/app/verb.json

# verb project configs
~/.data-store/app/verb/projects/foo.json
~/.data-store/app/verb/projects/bar.json
~/.data-store/app/verb/projects/baz.json
```

## Local configs

### verb.json

Project defaults may be stored locally in `{app-name}.json`. In this case, `app-name` is verb, but the same applies to [assembe][], [generate][], and [update][].
For example, the following will enable the Table of Contents for a project (if you're using [verb-readme-generator][]) and will add the `fooo` property to the context at render-time:

```json
{
  "options": {
    "toc": true
  },
  "data": {
    "fooo": "baaar"
  }
}
```

### package.json

The exact same configuration and support as `verb.json`, but the object is stored on the `verb` object in `package.json`:

```json
{
  "name": "my-project",
  "description": "It's a really nice project. seriously, it is. it's nice. reaaaly nice.",
  "verb": {
    "options": {
      "toc": true
    },
    "data": {
      "fooo": "baaar"
    }
  }
}
```
