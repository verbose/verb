# Engines

> Registering and using template engines with Verb.

Verb's default template engine is [engine-lodash][], but Verb can use any template engine to render templates. 

## Table of contents

<!-- toc -->

## Overview

- engines are registered with `verb.engine()`
- when registered, engines are stored as objects on `verb.engines`. 
- async engines must follow [consolidate.js][consolidate] conventions, and sync engines must follow [engines.js][engines] conventions.


## Register an engine

Engines are registered using `verb.register()`.

**Example**

```js
verb.register('foo', {}, function() {});
```

`.register` takes the following arguments:

- `ext` **{String}**: once registered, the engine will process any files with this extension. 
- `options` **{Object}**: optionally pass an object of options
- `engine` **{Function|Object}**: the engine to be registered (more on [engine format below](#author-an-engine))

### Usage examples

Render handlebars templates in files with the `.hbs` extension:

**Install**

```bash
$ npm i consolidate handlebars --save-dev
```

**Usage**

```js
// make sure you have handlebars installed in node_modules too!
var consolidate = require('consolidate');
verb.engine('.hbs', consolidate.handlebars);
```

Render Lo-Dash templates in files with the `.tmpl` extension:

**Install**

```bash
$ npm i engine-lodash --save-dev
```

**Usage**

```js
verb.engine('.tmpl', require('engine-lodash'));
```

## Author an engine

> Engines are just javascript functions that transform a string 

Engines can be a function, or an object with `.render()` and/or `.renderSync()` methods.

**Example**

The most basic engine is a function that takes the following paramters:

- `str`: the string to process
- `options` which will be passed to the engine as context/locals
- `cb`: callback function

```js
var coffee = require('coffee-script');

verb.engine('coffee', {ext: '.js'}, function(str, opts, cb) {
  try {
    cb(null, coffee.compile(str, opts));
  } catch(err) {
    return cb(err);
  }
});
```

