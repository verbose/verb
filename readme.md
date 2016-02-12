# verb [![NPM version](https://img.shields.io/npm/v/verb.svg)](https://www.npmjs.com/package/verb) [![Build Status](https://img.shields.io/travis/verbose/verb.svg)](https://travis-ci.org/verbose/verb)

> Documentation generator for GitHub projects.

## TOC

- [Install](#install)
- [What is verb?](#what-is-verb-)
- [Quickstart](#quickstart)
- [verbfile](#verbfile)
- [CLI Commands](#cli-commands)
  * [file](#file)
  * [cwd](#cwd)
  * [config](#config)
    + [tasks](#tasks)
- [API](#api)
- [Related projects](#related-projects)
- [Generate docs](#generate-docs)
- [Running tests](#running-tests)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i verb --save
```

## What is verb?

Verb is a documentation system that is simple and fast enough to use for generating the readmes for GitHub projects, but powerful and smart enough to build the most complex documentation projects around.

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

### config

Persist configuration settings to the `verb` object in `package.json`.

```sh
$ verb --config=[options]
```

Most of the above CLI commands can be prefixed with `config=` to persist the value to package.json.

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

### [Verb](index.js#L26)

Create a verb application with `options`.

**Params**

* `options` **{Object}**: Settings to initialize with.

**Example**

```js
var verb = require('verb');
var app = verb();
```

## Related projects

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://www.npmjs.com/package/base) | [homepage](https://github.com/node-base/base)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)

## Generate docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm i -d && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/verb/issues/new).

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the [MIT license](https://github.com/verbose/verb/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on February 12, 2016._