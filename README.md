# verb [![NPM version](https://badge.fury.io/js/verb.svg)](http://badge.fury.io/js/verb)  [![Build Status](https://travis-ci.org/assemble/verb.svg)](https://travis-ci.org/assemble/verb)

> Documentation generator for GitHub projects. Extremely powerful, easy to use, can generate anything from API docs to a readme, for projects big or small.

Verb is the most powerful, extensible and easy-to-use documentation generator for node.js.

## Install

Install with [npm](https://www.npmjs.com/)

```bash
npm i verb --save
```

## Usage

```js
var verb = require('verb');
```

## Features

* Generate markdown docs, or HTML
* Generate a Table of Contents simply by adding `<!-- toc -->` to any document.
* Include templates from locally installed npm packages with the `{%= include() %}` helper
* Include templates from your project's `docs/` directory with the `{%= docs() %}` helper
* Change the templates directory for either helper by passing a `cwd` to the helper: example: `{%= docs("foo", {cwd: ''}) %}`

## CLI

_(WIP)_

## API

> Verb's API is broken down into the following categories:

* [Template API](#template-api)
* [Config API](#config-api)
* [Data API](#data-api)
* [Middleware API](#middleware-api)
* [Task API](#task-api)

### Template API

_(WIP)_

Methods:

* `.create`
* `.loader`
* `.load`
* `.engine`
* `.helper`
* `.helpers`
* `.asyncHelper`
* `.asyncHelpers`
* `.render`

Verb exposes entire API from [template](https://github.com/jonschlinkert/template). See the [template docs] the full API.

### Config API

**Transforms**

Run immediately during init. Used to extend or modify the `this` object.

```js
verb.transform('engine', function() {
  this.engine('md', require('engine-lodash'));
});
```

**Application Settings**

> Set arbitrary values on `verb.cache`:

* `.set`
* `.get`
* `.del`

See the [config-cache docs] the full API.

**Options**

> Set and get values from `verb.options`:

* `.option`
* `.enable`
* `.enabled`
* `.disable`
* `.disabled`
* `.disabled`

See the [option-cache docs] the full API.

_(WIP)_

### Data API

> Set and get values from `verb.cache.data`

* `.data`

Verb exposes entire API from [plasma](https://github.com/jonschlinkert/plasma). See the [plasma docs] the full API.

_(WIP)_

### Middleware API

Verb exposes the entire [en-route] API. See the [en-route docs] the full API.

_(WIP)_

### Task API

### [.src](index.js#L64)

Glob patterns or filepaths to source files.

**Params**

* `glob` **{String|Array}**: Glob patterns or file paths to source files.
* `options` **{Object}**: Options or locals to merge into the context and/or pass to `src` plugins

**Example**

```js
verb.src('src/*.hbs', {layout: 'default'})
```

### [.dest](index.js#L80)

Specify a destination for processed files.

**Params**

* `dest` **{String|Function}**: File path or rename function.
* `options` **{Object}**: Options and locals to pass to `dest` plugins

**Example**

```js
verb.dest('dist')
```

### [.copy](index.js#L99)

Copy a `glob` of files to the specified `dest`.

**Params**

* `glob` **{String|Array}**
* `dest` **{String|Function}**
* `returns` **{Stream}**: Stream, to continue processing if necessary.

**Example**

```js
verb.task('assets', function() {
  verb.copy('assets/**', 'dist');
});
```

### [.task](index.js#L118)

Define a Verb task.

**Params**

* `name` **{String}**: Task name
* `fn` **{Function}**

**Example**

```js
verb.task('docs', function() {
  verb.src(['.verb.md', 'docs/*.md'])
    .pipe(verb.dest('./'));
});
```

### [.getCollection](index.js#L154)

Get a view collection by it's singular or plural name (e.g. "page" or "pages").

* `returns` **{String}** `name`: Singular name of the collection to get

**Example**

```js
var collection = verb.getCollection('pages');
// gets the `pages` collection
//=> {a: {}, b: {}, ...}
```

### [.diff](index.js#L234)

Display a visual representation of the difference between two objects or two strings.

**Params**

* `a` **{Object|String}**
* `b` **{Object|String}**
* `methodName` **{String}**: Optionally specify a method name to use from [jsdiff](https://github.com/nathan7/jsdiff)

**Example**

```js
var doc = verb.views.docs['foo.md'];
verb.render(doc, function(err, content) {
  verb.diff(doc.orig, content);
});
```

### [.watch](index.js#L296)

Re-run the specified task(s) when a file changes.

**Params**

* `glob` **{String|Array}**: Filepaths or glob patterns.
* `fn` **{Function}**: Task(s) to watch.

**Example**

```js
verb.task('watch', function() {
  verb.watch('docs/*.md', ['docs']);
});
```

## Related projects

* [en-route](https://github.com/jonschlinkert/en-route): Routing for static site generators, build systems and task runners, heavily based on express.js routes… [more](https://github.com/jonschlinkert/en-route)
* [template](https://github.com/jonschlinkert/template): Render templates using any engine. Supports, layouts, pages, partials and custom template types. Use template… [more](https://github.com/jonschlinkert/template)

## Why use Verb?

It's magical and smells like chocolate. If that's not enough for you, it's also the most powerful and easy-to-use documentation generator for node.js. And it's magical.

## Running tests

Install dev dependencies:

```bash
npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/assemble/verb/issues/new)

## Major changes

* `v0.4.0`: Verb now requires [verb-cli](https://github.com/verbose/verb-cli)to run. See the [getting started](#getting-started) section for details.

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright (c) 2014-2015 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the [MIT](https://github.com/assemble/verb/blob/master/LICENSE) license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on May 12, 2015._