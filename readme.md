# verb [![NPM version](https://img.shields.io/npm/v/verb.svg?style=flat)](https://www.npmjs.com/package/verb) [![NPM downloads](https://img.shields.io/npm/dm/verb.svg?style=flat)](https://npmjs.org/package/verb) [![Build Status](https://img.shields.io/travis/verbose/verb.svg?style=flat)](https://travis-ci.org/verbose/verb)

Documentation build system for GitHub projects.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install verb --save
```

A project without documentation is like a project that doesn't exist. Verb solves this by making it dead simple to generate documentation, using simple markdown templates, with zero configuration required.

**I just want to generate a readme, can verb do this?**

Yes! See [verb-readme-generator](https://github.com/verbose/verb-readme-generator).

## Features

* Convert markdown templates to markdown files _or_ static HTML
* Use any template engine, such as [handlebars](http://www.handlebarsjs.com/), [lodash](https://lodash.com/) or [swig](https://github.com/paularmstrong/swig)
* Use templates, partials, or layouts
* Helper support (sync and async!)
* Collections
* Plugins

**Plugins**

Verb has first-class plugin support, along with native support for [gulp](http://gulpjs.com) plugins, so you can do things like:

* Ignore files marked as "drafts"
* CSS minification or reduction
* Spin up a dev server
* SASS or LESS compiling and minification
* JavaScript minification, reduction or concatenation
* Asset copying or renaming
* Image compression
* HTML minification and linting
* RSS feeds

**Developers**

* Use custom code to your project's `verbfile.js` (like `gulpfile.js` or `Gruntfile.js`)
* Use globally or locally installed verb "generators"
* Support for sub-generators
* Generators can be composed of multiple single-responsibility generators

## What is verb?

Verb is a documentation system that is simple and fast enough to use for generating a readme for a GitHub project, but powerful and smart enough to build the most complex documentation projects around.

Verb is also highly pluggable, with first-class support for instance plugins, pipeline (gulp/vinyl) plugins, routes and middleware, any template engine, helpers, and more.

## Quickstart

**Install readme generator**

The `verb-readme-generator` is a good example of what's possible with verb, and it's an easy way to get started. You can install the library with the following command:

```sh
$ npm i -g verb-readme-generator
```

**.verb.md**

You should now be able to generate your project's readme from a `.verb.md` template with the following command:

```sh
$ verb readme
```

Or you can go a step further by adding a `verbfile.js` to your project, allowing you to customize verb with generators, plugins, middleware, helpers, templates and more!

**verbfile.js**

Next, create a `verbfile.js` with the following code:

```js
module.exports = function(app) {
  app.extendWith('verb-readme-generator');

  // call the `readme` task from verb-readme-generator
  app.task('default', ['readme']);
};
```

## verbfile

Your project's `verbfile.js` should either export an instance of Verb or a function.

**Instance**

```js
var verb = require('verb');
var app = verb();

module.exports = app;
```

**Function**

When a function is exported, we refer to these as [verb generators](#verb-generators). Verb generators can be locally or globally installed, and can be composed with other verb generators and/or [sub-generators](#sub-generators).

```js
module.exports = function(verb) {
  // "private" verb instance is created for this verbfile
};
```

## CLI Commands

There are several generic flags for setting options from the command line: `option`, `data`, `config` and `save`. Beyond these there are also a number of specialized flags described below.

* `--option`: set options in memory
* `--data`: set data to be passed to templates in memory
* `--config`: persist options to package.json
* `--save`: persist options to a global config store

### config

Persist configuration settings to the `verb` object in `package.json`.

```sh
$ verb --config <options>
```

Most of the above CLI commands can be prefixed with `--config` to persist the value to package.json.

### save

Persist options values to the global data store for `app` ([verb](https://github.com/verbose/verb), [assemble](https://github.com/assemble/assemble), [generate](https://github.com/generate/generate), [update](https://github.com/update/update), etc)

```sh
$ verb --save <options>
```

Most of the above CLI commands can be prefixed with `--save` to persist the value to the global config store.

### file

Specify the file to use instead of `verbfile.js`.

```sh
$ verb --file <filename>
```

**Example**

```sh
$ verb --file foo.js
```

### cwd

Specify the cwd to use

```sh
$ verb --cwd=<directory>
```

**Example**

```sh
$ verb --cwd="foo/bar"
```

Display the currently defined cwd:

```sh
$ verb --cwd
```

#### tasks

Set the default tasks to run for a project:

```sh
$ verb --config=tasks:<tasks>
```

**Example**

```sh
# single task
$ verb --config=tasks:foo

# array of tasks
$ verb --config=tasks:foo,bar,baz
```

## API

### [Verb](index.js#L23)

Create a verb application with `options`.

**Params**

* `options` **{Object}**: Settings to initialize with.

**Example**

```js
var verb = require('verb');
var app = verb();
```

## Upgrading

**Clear your cache and re-install**

If you're currently running verb v0.8.0 or lower, please do the following to clear out old versions of verb, so that the latest version of verb will install properly:

```bash
$ npm cache clean && npm i -g verb
```

## Related projects

You might also be interested in these projects:

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://www.npmjs.com/package/base) | [homepage](https://github.com/node-base/base)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/verbose/verb/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/verbose/verb/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on April 24, 2016._