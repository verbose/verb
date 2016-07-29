A project without documentation is like a project that doesn't exist. Verb solves this by making it dead simple to generate documentation, using simple markdown templates, with zero configuration required.

**I just want to generate a readme, can verb do this?**

Yes! Just run [verb-readme-generator][].


## What is verb?

Verb is a documentation build system that is simple and fast enough to use for generating a readme for a GitHub project, but powerful and smart enough to build the most complex documentation projects around.

Verb is also highly pluggable, with first-class support for instance plugins, pipeline (gulp/vinyl) plugins, routes and middleware, any template engine, helpers, and more.

## Features

* Create markdown docs from templates
* Use any template engine, such as [handlebars][], [lodash][] or [swig][]
* Use templates, partials, or layouts
* Helper support (sync and async!)
* First class template collection support
* Instance plugins and pipeline plugins
* Middleware

**Plugins**

Verb has first-class plugin support, along with native support for [gulp][] plugins, so you can do things like:

* [Ignore files][gulp-drafts] marked as "drafts"
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

## CLI

**Installing the CLI**

To run verb from the command line, you'll need to install verb globally first. You can that now with the following command:

```sh
$ npm i -g verb
```

This adds the `verb` command to your system path, allowing it to be run from any directory in a project.

**How the Verb CLI works**

When the `verb` command is run, the globally installed verb looks for a locally installed verb module using node's `require()` system.

If a locally installed verb is found, the CLI loads the local installation of the verb library. If a local verb is not found, the global verb will be used.

Next, verb applies the configuration from your `verbfile.js` and/or `.verb.json`, then executes any generators or tasks you've specified for verb to run.

### Command prefixes

The following flags can be used as "prefixes" to other commands for setting options from the command line:

- `--option`: set options in memory
- `--data`: set data to be passed to templates in memory
- `--config`: persist options to package.json
- `--save`: persist options to a global config store

### Commands

{%= apidocs("lib/commands/*.js") %}

### silent

Typically, when running generators and tasks you'll see something like this in the terminal.

![running-generators](https://cloud.githubusercontent.com/assets/383994/14978816/7449a5c6-10ec-11e6-9bac-07e482e915f2.gif)

Since it's common for tasks to be composed of other smaller tasks, or for generators to be composed of other generators or sub-generators, sometimes it's necessary to prevent these sub-tasks or sub-generators from displaying in the terminal.

To silence a specific task,

### config

Persist configuration settings to the `verb` object in `package.json`.

```sh
$ verb --config <options>
```

Most of the above CLI commands can be prefixed with `--config` to persist the value to package.json.


### save

Persist options values to the global data store for `app` ([verb][], [assemble][], [generate][], [update][], etc)

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
{%= apidocs("index.js") %}

## Upgrading
{%= include("upgrading") %}
