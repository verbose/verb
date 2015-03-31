# Verb API

> Learn about the various components of Verb's API and how everything fits together.

## Concepts

Verb's API is a superset of the following concepts:

- [Template API](#template-api) 
- [Config API](#options-api) 
- [Data API](#data-api) 
- [Middleware API](#middleware-api) 
- [Workflow (Task) API](#workflow-api) 


## Developer summary

- **Template API**: methods for loading, caching and rendering, like `.loader()`, `.load()`, `.page()`, `.partial()`, `.layout()`, `.render()`, `.engine()`, `.helper()` etc.
- **Config API**: methods for setting options, `.option()`, `.enable()`, `.disable()`
- **Data API**: methods for loading, and caching data to be passed to templates, like `.data()`, `.transform()`
- **Middleware API**: methods related to routes and middleware, like `.use()`, `.preRender()` etc
- **Workflow (Task) API**:  methods for reading and writing to disk, and watching files: `.src()`, `.dest()`,  `.task()`, `.watch()`. Without doing math, I'm guessing this is less than 10% of the API

## Config API 

> Get and set globally available options and config values

Verb's Config API exposes methods for setting and getting configuration values that can be used anywhere in your verb application.

**Summary**

- Options are stored on the `verb.options` object.


**Options Methods**

Options are stored on the `verb.options` object.

- `.option`
- `.enable` and `.enabled`
- `.disable` and `.disabled`

**Cache Methods**

Arbitrary values may be stored on the `verb.cache` object, as long as they do not overwrite Verb's [protected properties][].

- `.get`
- `.set`

The `.get()` and `.set()` methods are used for getting and setting values on the `verb.cache` object. This object is "reserved" for you to store whatever values you need. 

**Usage**

```js
verb.set('drink', 'Tea, Earl Grey, hot.');

var drink = verb.get('drink');
//=> 'Tea, Earl Grey, hot.'
```

## Template API 

> Define, load and render templates

- `.create`
- `.page`
- `.partial`
- `.layout`
- `.engine`
- `.helper`
- `.render`


## Data API 

> Define load, transform and process data to be passed as context to templates at runtime

- `.data`
- `.transform`


## Middleware API 

- `.use`
- `.route`
- `.all`
- `.onLoad`
- `.preRender` 
- `.postRender` 


## Libraries used

> TODO

- **Workflow API**

  + vinyl, vinyl-fs: file format
  + orchestrator: `.task`, `.src`, `.dest` methods

- **Config API**

  + options-cache

- **Data API**

  + plasma

- **Template API**

  + template
  + helper-cache
  + engine-cache
  + loader-cache

- **Middleware API**

  + en-route (route)


## Workflow API 

> Read, copy, process and write files

The Workflow API handles "the moving parts" of the build process and consists the following methods:

- `.task`
- `.src`
- `.dest`
- `.watch`

**Example**

```js
verb.task('default', function() {
  verb.src('templates/*.hbs')
    .pipe(verb.dest('templates/*.hbs'))
});
```

**Learn more**

- [defining-tasks](./defining-tasks.md)
- [sessions](./task-sessions.md) (TODO: @doowb)


**Related**

- [plugins](./authoring-plugins.md)
- [protected properties](./protected-properties.md)

