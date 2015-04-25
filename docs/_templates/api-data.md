# Data 

> Define load, transform and process data to be passed to templates as context at render time

This document describes how Verb works with data, and the methods to used for setting and getting data.

## Table of contents

<!-- toc -->

## Overview

- Data that will be passed to templates is stored on `verb.cache.data`.

**verb.data and package.json**

- At runtime, Verb loads your project's package.json, so the data can be used in templates.
- Data from package.json is stored on `verb.cache.data`.
- Get the `data` object directly using `verb.cache.data`, or with `verb.get('data')`.
- Get values from this object using `verb.cache.data[foo]` or `verb.get('data.foo')`.

**verb.env**

- A read-only clone of the data from package.json is stored on `verb._env`.
- You may get values from this object using `verb.env('foo')`

## API

### .data

```js
// pass an object
verb.data({foo: 'bar'});

// pass a glob
verb.data('foo/*.json');
verb.data('foo/*.yml');
verb.data('foo/*.{json,yml}');
```

### .set / .get

Set and get arbitrary values on `verb.cache`.

### .set

Store a value:

```js
verb.set('a', 'b');
verb.get('a');
//=> 'b'
```

Use object paths (dot notation) to set nested values:

```js
verb.set('a.b.c', 'd');
verb.get('a');
//=> {b: {c: 'd'}}
```

**Good to know**

Although the `.set()` and `.get()` methods store values on `verb.cache`, Verb only uses child objects on `verb.cache`, like `verb.cache.data`. You may use this object however you want.

### .get

Sugar for `verb.cache[foo]`



Dot notation may also be used for getting values.

**Dot notation**

For example, instead of doing `verb.cache.data.repository.url`

```js
// get the project name
verb.get('data.name');

// or to get the unmodified name from `_env`
verb.env('name');
```

## package.json

Along with other sources of data, Verb uses data from package.json to render templates.
