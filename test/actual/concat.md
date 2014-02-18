# Documentation

**Table of Contents**
* [Overview](#overview)
* [Advanced configuration](#advanced-configuration)
* [Features](#features)
* [Options](#options)
* [filters](#filters)
* [Examples](#examples)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)


## Overview
In general, the conventions used by this task are as follows:

**Templates**
* Files with extension `.tmpl.md` are generally templates that will be compiled one-to-one into documents
* Files with extension `.md` are generally intended to be used as includes.
* `{%= docs("foo") %}` is used to included files from your project's `./docs` directory
* `{%= include("foo") %}` is used to include boilerplate files from phaser

## Advanced configuration
To change the plugin's defaults, add a section to your project's Gruntfile named `function (name, options) {
    var opts = _.extend({}, phaserOpts, options);
    return phaser.utils.safename(name, opts);
  }` to the data object passed into `grunt.initConfig()`:

```js
grunt.initConfig({
  // The "repos" task
  repos: {
    options: {}
  },

  // The "readme" task
  readme: {
    options: {
      metadata: {}
    }
  }
});
grunt.loadNpmTasks('phaser');
grunt.registerTask('default', ['readme']);
```

## Features
### templates

### Readme template

* `docs/`
* `node_modules/grunt-readme/templates/`
* `options.readme`
* `options.resolve.readme`


### YAML Front Matter
Add YAML front matter to documents to extend the metadata that is supplied to your project's templates.

```yaml
---
username: jonschlinkert
---
```
This is probably most useful when:
1. You need to use the same or similar templates on a number of different projects
1. You want to supply data to the templates that won't typically be found in package.json


### Code Comments
Code comments used in markdown templates will be stripped from the rendered files as long as they adhere to the following syntax:

```handlebars
// Whitespace inside comments is insignificant
{{!-- foo --}}
{{! foo }}
```

### Escaping

#### Escaping hashes
This task automatically adjusts heading levels in included templates. For example, `#` is adjusted to `##`, so that heading levels "line up" properly after the README is built.

This can cause problems if you're using hashes for a reason other than headings, such as CSS Id's in code comments. So to prevent phaser from converting `#id {}` to `##id {}`, just add a  single backtick before the hash: <code>`#id {}</code>.

#### Escaping Lo-Dash templates
To prevent Lo-Dash from attempting to evaluat templates that shouldn't be (_as with code examples_), just use square brackets instead of curly braces in any templates that have similar patterns to these: `{%= .. %}`, `{%- .. %}`, and `{% .. %}`. The square brackets will be replaced with curly braces in the rendered output.


## Options
### Overview of available options

[Also see examples →](./DOCS.md#examples)
```js
readme: {
  options: {
    readme: '',
    templates: '',
    metadata: '',
    sep: '\n',
    prefixes: [],
    contributing: true
  }
}
```

### readme
Type: `String`
Default: `./node_modules/phaser/tasks/templates/README.tmpl.md`

By default, if no options are specified the task will look for a `README.md.tmpl` template to use, if none is found the task will use the "starter" file supplied by `phaser` (more detail below). Example:

```js
readme: {
  options: {
    readme: 'path/to/custom/README.md.tmpl'
  }
}
```

1. If the `readme` options is defined, the task will use that custom template.
1. If (1) is undefined, the task uses the directory defined by `options: { docs: ''}`
1. If (2) is undefined, the task checks if `README.tmpl.md` exists in the `./docs` directory (without having to define it in the options)
1. if (3) is undefined, `options: { resolve: { readme: ''}}` attempts to automagically use a `README.tmpl.md` template from `node_modules`. The module must must be defined in `devDependencies`. Note that for a README template to resolve properly from `node_modules`, the `main` property in the `package.json` of the module being referenced must specify the path to the template. This option is probably most useful when you plan to use the same README template on a number of projects.
1. If (4) is undefined, the task uses the "starter" README template from `phaser`.


### metadata
Type: `Object`
Default: `package.json`

Optional source of metadata to _extend the data object_ that is passed as context into the templates. Context of the data object is the value of `this`, and properties in `package.json` will be ignored when matching properties are defined on the `metadata` object. Example:

```js
readme: {
  options: {
    metadata: {
      name: 'Foo',
      description: 'This is foo.'
    }
  }
}
```

#### data files

Or specify the path or paths to any `.json` or `.yml` files to use. Any of the following formats will work:

```js
readme: {
  options: {
    metadata: 'docs/metadata.json'
  }
}
```

Array of files:

```js
readme: {
  options: {
    metadata: ['docs/one.json', 'docs/two.yml'],
  }
}
```

[minimatch][] (wilcard/globbing) patterns:

```js
readme: {
  options: {
    metadata: ['docs/*.{json,yml}', 'foo.json']
  }
}
```


Since context is the value of "this", the `metadata` path is not required in templates, only property names:

* `{%= name %}` (e.g. not `{%= metadata.name %}`) => `Foo`
* `{%= description %}` => `This is foo.`



#### docs
Type: `String`
Default: `./docs/`

Override the default directory for files included using `{%= docs('foo.md') %}`. This defaults to the `./docs` directory in the root of your project.

```js
readme: {
  options: {
    docs: 'foo/'
  }
}
```


#### templates
Type: `String`
Default: `./node_modules/phaser/tasks/templates/` (relative to your project)

Override the default `cwd` for files included by using `{%= include('foo.md') %}`. By default, the `include` mixin will look for files in `./node_modules/phaser/tasks/templates` directory, where some starter templates are stored. ([Also see examples →](./DOCS.md#examples))

```js
readme: {
  options: {
    templates: 'bar/'
  }
}
```


### remove
Type: `Array`
Default: `grunt|helper|mixin`

Any string defined in the remove will be removed from the content passed in using the `{%= _.shortname() %}` template. Example:

```js
readme: {
  options: {
    remove: ["foo", "bar", "baz"]
  }
}
```

Given a `package.json` with the following property:

```json
{
  "name": "foo-module"
}
```

when referenced in a template like this:

```js
# {%= _.titleize(_.shortname(name)) %}
```

will renders to:

```
# Module
```

### contributing
Type: `Boolean`
Default: `True`

By default, the README task copies a basic `CONTRIBUTING.md` file to the root of your project. If one exists, the task will skip this. If you wish to prevent the task from adding this file to your project, set the `contributing` option to `false`.


### sep
Type: `String`
Default: `\n`

Separator to use between sections of content that is included using the `include` or `doc` filters (more about these in the "filters" section below). This option is more useful when you use [minimatch][] patterns to specify the files to include.

The `sep` option can either be defined in the task options:

```js
readme: {
  options: {
    sep: '\n***\n'
  }
}
```

or as a second parameter in the `include` or `doc` filters.

* `{%= include("docs-*.md", "***") %}` (more below...)
* `{%= docs("*.md", "\n***\n") %}` (more below...)

[minimatch]: https://github.com/isaacs/minimatch


## filters


## Examples
## Template Examples

> Copy/paste any of these examples into your templates as a starting point.


### Name

```js
{%= name %}
```
> phaser


### Version

```js
{%= version %}
v{%= version %}
{%= version ? " v" + version : "" %}
{%= version ? " * @version " + version + "\\n" : "" %}
```
> 0.1.3
> v0.1.3
> v0.1.3
> * @version 0.1.3\n

### Description

```js
{%= description %}
{%= description ? " * " + description + "\\n" : "" %}
```
> Generate your README from a template. If you already use Grunt, this is a no brainer.
> * Generate your README from a template. If you already use Grunt, this is a no brainer.\n



### Homepage

```js
{%= homepage ? " | " + homepage : "" %}
{%= homepage ? " * " + homepage + "\n" : "" %}
{%= homepage ? " * @docs " + homepage + "\\n" : "" %}
```
>  | https://github.com/assemble/phaser
> * https://github.com/assemble/phaser
>
>  * @docs https://github.com/assemble/phaser\n



### AUTHORS

[AUTHORS](NPM https://npmjs.org/doc/json.html)

> If there is an `AUTHORS` file in the root of your package, npm will treat each line as a `Name <email> (url)` format, where email and url are optional. Lines which start with a # or are blank, will be ignored. **[-- NPM]((NPM https://npmjs.org/doc/json.html)**

To use `author` data from `package.json`:

```js
[{%= author.name %}]({%= author.url %})
```
> [Jon schlinkert](http://github.com/jonschlinkert)

```js
{%= author.name ? " * @author " + author.name + "\\n" : "" %}
{%= author.url ? " * @link " + author.url + "\\n" : "" %}
```
>  * @author Jon Schlinkert\n
>  * @link https://github.com/jonschlinkert\n

Or, if you prefer to use an `AUTHORS` file in the root of the project:

```js
[{%= authors[0].name %}]({%= authors[0].url %})
```
> [Jon schlinkert](http://github.com/jonschlinkert)
> [Brian Woodward](http://github.com/doowb)


### Time and date

```js
{%= grunt.template.today() %}
```
> Tue Sep 17 2013 18:38:42

```js
{%= grunt.template.today("yyyy") %}
```
> 2013

```js
{%= grunt.template.today("yyyy-mm-dd") %}
```
> 2013-09-17

```js
_This file was generated on {%= grunt.template.date("fullDate") %}._
```
> _This file was generated on Monday, September 30, 2013._


### Banner

```js
/*!
 * {%= name %} v{%= version %},  {%= grunt.template.today("yyyy-mm-dd") %}
 * {%= homepage %}
 * Copyright (c) {%= grunt.template.today("yyyy") %} {%= author %}, contributors.
 * {%= _.license() %}.
 */
```

> /*!
 * phaser v0.1.3,  2013-09-22
 * https://github.com/assemble/phaser
 * Copyright (c) 2013 [object Object], contributors.
 * Released under the MIT license.
 */

### Changelog / Release History

```js
{%= include("docs-changelog.md") %}
```

> * 2013-09-21   **v0.1.3**   Completely refactored. Adds a lot of documentation.
 * 2013-09-19   **v0.1.0**   First commmit.


Or:

```js
 * {%= grunt.template.today('yyyy') %}   v0.1.0   First commit
```
> * 2013   v0.1.0   First commit



### License

```
{%= _.license() %}
```
> Released under the [MIT license](./LICENSE-MIT).



### Contributors

```js
{%= _.contributors() %}
```
> Jon Schlinkert
> Brian Woodward


### Metadata

You can mix and match formats in the `metadata` option, all of the following shoulw work:

```js
grunt.initConfig({
  pkg: 'package.json',
  foo: 'package.json',
  bar: grunt.file.readJSON('package.json'),
  qux: grunt.file.readJSON('test/fixtures/data/one.json'),
  baz: ['<%= bar %>'],

  config: {
    one: 'test/fixtures/data/one.json',
    two: 'test/fixtures/data/two.yml',
    three: 'test/fixtures/data/three.json',
    pkg: grunt.file.readJSON('package.json'),
    qux: grunt.file.readJSON('test/fixtures/data/one.json')
  },


  // Obviously you can't have duplicate properties on an
  // object, so this is just for illustrative purposes
  // The point is.. you can get just about as crazy as you want.
  readme: {
    options: {
      metadata: ['<%= pkg %>', '<%= qux %>'],
      metadata: ['<%= config.pkg %>', '<%= config.qux %>'],
      metadata: ['<%= pkg %>', {foo: 'bar'}],
      metadata: ['<%= pkg %>', 'test/fixtures/data/*.{json,yml}'],
      metadata: '<%= config.one %>',
      metadata: 'test/fixtures/data/one.json',
      metadata: ['test/fixtures/data/one.json', 'test/fixtures/data/two.yml'],
      metadata: ['test/fixtures/data/two.yml', {description: 'Foo', name: 'Bar'}, '<%= pkg %>', 'test/fixtures/data/*.json', {alpha: 1, beta: 2 }, {kappa: 3, gamma: 4 }, {zed: {orange: 5, apple: 6 } }, '<%= config.one %>', {name: 'New'}, {quux: '<%= qux %>'}, ['one', {pkg: '<%= config.pkg %>'}, 'three'], {arr: ['one', 'two', 'three']}],
      metadata: ['<%= config.one %>', '<%= config.two %>'], metadata: 'test/fixtures/data/*.{json,yml}',
      metadata: ['test/fixtures/data/*.{json,yml}'],
      metadata: ['test/fixtures/data/*.json', 'test/fixtures/data/*.yml'],
      metadata: ['test/fixtures/data/*.json', '<%= config.two %>'],
      metadata: {
        description: 'Foo',
        name: 'Bar'
      }
    }
  }
}
```

## Contributing
Find a bug? Have a feature request? Please [create an Issue](https://github.com/assemble/phaser/issues).

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][], and build the documentation with [grunt-readme](https://github.com/assemble/grunt-readme).

Pull requests are also encouraged, and if you find this project useful please consider "starring" it to show your support! Thanks!

## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license

***


# phaser [![NPM version](https://badge.fury.io/js/phaser.png)](http://badge.fury.io/js/phaser) [![Build Status](https://travis-ci.org/assemble/phaser.png)](https://travis-ci.org/assemble/phaser)

> The most deadly markdown documentation generator in the Alpha Quadrant.

Please [report any bugs or feature requests](https://github.com/assemble/phaser/issues/new), thanks!

<!-- toc -->
* [Install](#install)
* [Examples](#examples)
* [Options](#options)
  * [metadata](#metadata)
  * [variable](#variable)
  * [namespace](#namespace)
  * [omit](#omit)
* [Config](#config)
  * [metadata](#metadata)
* [Context](#context)
  * [Overriding default config](#overriding-default-config)
  * [Extending the Context](#extending-the-context)
  * [options.config vs options.data](#optionsconfig-vs-optionsdata)
* [Defaults](#defaults)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)

<!-- toc stop -->
## Install
#### Install with [npm](npmjs.org)

```bash
npm i phaser --save-dev
```

Now that Phaser is installed, run:

```
phaser
```

That wasn't so hard, was it?

## Examples
Example document:

```js
# {%= name %}

> {%= description %}

{%= toc %}

## Overview
{%= doc("overview.md") %}

## Options
{%= doc("options.md") %}

## Examples
{%= doc("examples.md") %}

## License and Copyright
{%= copyright %}
{%= license %}
```

## Options

* defaults
* options

### metadata
Type: `object|array|string`

Default: `undefined`

* `string`: When defined as a string,

### variable
Type: `string`

Default: `undefined`

Lo-Dash opts...

### namespace
Type: `boolean|string`

Default: `undefined` (options: `true`|`"only"`)

When `namespace` defined, an object is created for each data file, where the top level property on the object is the name of the file itself, and the data contained within the file is extended into that object. [See examples](#namespacing).

### omit

Omit properties from the context.

Type: `Array`

Defaults: `[]`

Returns: `Object`

Useful if properties are added via options, but should not be on the context.



## Config


* package.json | alt config object
* metadata

### metadata

Unless overridden in the options, Phaser will attempt to process templates using only the data from your project's [package.json](./package.json). Thus, using only the default settings our context might look something like this:

```js
{
  "name": "phaser",
  "description": "Documentation generator. Build docs from markdown, Lo-Dash templates, includes, and YAML front matter.",
  "version": "0.1.0",
  "homepge": "https://github.com/jonschlinkert/phaser",
  "dependencies": {
    "fs-utils": "~0.1.11",
    "gray-matter": "~0.2.3",
    "findup-sync": "~0.1.2",
    "frep": "~0.1.3",
    "globule": "~0.2.0",
    "lodash": "~2.4.1",
    "marked-toc": "~0.1.5",
    "template": "~0.1.3"
  },
  // continued...
}
```

For the majority of projects, this will be enough. _But Phaser gives you as much flexibility as you need to extend the context._


## Context

Your project's [package.json](./package.json) will be used as the default config object, which is passed as context to templates. If no other config object is passed to the `config` option, and no metadata is passed in through other means, then this is the context that will be used to process your templates.

### Overriding default config
As mentioned in the previous section, the default config object, `package.json`, can be explicitly overridden by passing an object to `options.config`. Example:

```js
// Raw object
phaser(str, {config: {name: 'foo'}});

// String (filepath)
phaser(str, {config: 'path/to/*.json'});
```

### Extending the Context
From least specific to most specific, this is how the context is extended. In other words, the **last wins**:

* `filters|functions`: [Lo-Dash filters]() and custom functions may be used to build up the context when other more conventional means aren't available. For example, an `authors()` mixin/function might be used to read the [AUTHORS](./AUTHORS) file, and then extend the context with the names of the authors therein.
* `options`: Variables defined directly on the `options` object, e.g. `{name: "phaser"}`.
* `options.data`: Variables from the `options.data` property. This is a very flexible property:
  - `Object`: You may pass a raw object directly to the property, e.g. `{data: {name: "phaser"}}`.
  - `String`If you pass a string, Phaser will try to require it. If that doesn't work, Phaser will try to read it in.
  - Minimatch (glob) patterns may be used, and with either JSON or YAML files, e.g. `{data: 'foo/bar/**/*.{json,yml}'}`
* `metadata`: Front matter



For example, let's say we need to extend the context with some data that isn't in our example `package.json`, such as `author.name`. We have a few options:

* `options.data`: Define a raw `object`|`array` directly on the `options.data` object.
* Front matter in the templates themselves
* JSON / YAML data files, e.g. `foo.json`, `foo.yml` etc.

### options.config vs options.data
Although the options are similar, they serve a different purpose:

* `options.config`: overrides the default config object, so **no data** from `package.json` will be used as the context.
* `options.data`: extend the config object, so **both** data from `package.json` and from `options.data` will be used to extend the context.


#### Raw

Example:

```js
options: {
  author: {
    name: "Jon Schlinkert",
    url: "https://github.com/jonschlinkert"
  }
}
```

#### Front Matter

Example:

```markdown
---
username: jonschlinkert
---
Visit [some link](https://github.com/{%= username %}/foo) to learn more!

```

#### Data files

`foo.json, bar/baz/*.json`

```json
{
  "author": {
    "name": "Jon Schlinkert",
    "url": "https://github.com/jonschlinkert"
  }
}
```

##### namespacing
Given we have a file named `author.json` with the following contents:

**namespace: false**

```json
{
  "author": {
    "name": "Jon Schlinkert",
    "url": "https://github.com/jonschlinkert"
  }
}
```

**namespace: true**
The following object would be merged into the context:

```json
{
  "author": {
    "name": "Jon Schlinkert",
    "url": "https://github.com/jonschlinkert"
  }
}
```

## Defaults
```js
{
  // Logging
  verbose: true,
  debug: 'tmp/ctx.json',

  // Metadata
  namespace: '',

  // Extensions
  filters: 'test/filters/*.js',
  contributing: true,

  // Glob defaults
  matchBase: true,

  // Processing
  delimiters: ['{%', '%}'],
  replacements: [],
}
```

## Contributing
Find a bug? Have a feature request? Please [create an Issue](https://github.com/assemble/phaser/issues).

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][], and build the documentation with [grunt-readme](https://github.com/assemble/grunt-readme).

Pull requests are also encouraged, and if you find this project useful please consider "starring" it to show your support! Thanks!

## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated by [grunt-readme](https://github.com/assemble/grunt-readme) on Tuesday, February 18, 2014._

# phaser [![NPM version](https://badge.fury.io/js/phaser.png)](http://badge.fury.io/js/phaser)  [![Build Status](https://travis-ci.org/assemble/phaser.png)](https://travis-ci.org/assemble/phaser)

> The most deadly markdown documentation generator in the Alpha Quadrant.

_Exactly_ like the one on Star Trek, except instead of "stun" and "kill", this Phaser generates markdown documentation. Making it hands-down the most lethal markdown documentation generator on the planet (and probably others ones too).

<!-- toc -->
* [Install](#install)
* [About](#about)
  * [Ease of Use](#ease-of-use)
  * [API](#api)
* [Features](#features)
  * [How does Phaser differ from Assemble?](#how-does-phaser-differ-from-assemble)
  * [How Phaser Works](#how-phaser-works)
* [Authors](#authors)
* [License](#license)

<!-- toc stop -->
Please [report any bugs or feature requests](https://github.com/assemble/phaser/issues/new), thanks!

![image](https://f.cloud.github.com/assets/383994/2181984/e30dc88c-9774-11e3-9bef-511e91b019b9.png)

## Install
#### Install with [npm](npmjs.org)

```bash
npm i phaser --save-dev
```

Now that Phaser is installed, run:

```
phaser
```

That wasn't so hard, was it?

## About
### Ease of Use

> Phaser loves users

So its number one priorty is ease-of use. For new users **zero configuration** is required to get started. Once Phaser is installed, simply enter `phaser` in command line, and you're off and running.

For more experienced users, Phaser offers _more than 50 template tags and filters, includes and partial caching, comment parsing, YAML Front Matter (or Coffee Front Matter!), plugins, mixins, tons of helpful JavaScript and Node.js utilites_, and lots more.

### API

> Phaser also loves developers

Offering an extensive API and tools for building plugins or extending Phaser in other ways.

## Features

* Lo-Dash templates and mixins
* The full power of JavaScript
* Filters
* Tags
* Partial Caching
* Mixins
* Templates can be used directly, cached as JavaScript, and/or via `require` statements
* Uses [gray-matter][] to support both YAML Front Matter and Coffee Front Matter
* Easily add a **Table of Contents** to any file
* Generate a **multi-file Table of Contents**, along with relative links to each file AND section
* Comment parsing (basic)
* Extensive API
* File-system Utilities
* Logging
* Lots more! So much more. Much much more. So much more that you don't even know how much more it's so much. I don't know where to start.

### How does Phaser differ from Assemble?

Phaser was specifically created to make it easier to manage documentation for GitHub projects. In a nutshell:

* Use [Assemble][] to build components, sites, blogs and other projects where HTML is the end result.
* Use Phaser to generate and maintain markdown documentation for your [Assemble][] (or non-Assemble) projects.

#### Comparison

While both engines can be extended to accomplish most of the following features, this table describes what you should expect from each _out-of-the-box_:

**Feature** | **[Assemble][]** | **Phaser**
------- | -------- | ------
**Summary** | Build HTML projects from modular components and data | Generate markdown documentation
**Focus** | Power, granular access to context, components | Speed, ease-of-use, command-line
**Template Engine** | Handlebars by default, any template engine can be added. | Lo-Dash
**Extensions** | Plugins, Lo-Dash Mixins, Helpers, Filters, Tags <sup>[1](#1-depends-on-the-template-engine)</sup> | Plugins, Lo-Dash Mixins, Filters, Tags
**Static Blogs** | Yes | No
**Static Sites** | Yes | No
**HTML Documentation** | Yes | Limited.
**Markdown Documentation** | Limited | Yes
**Markdown to HTML** | Yes | Limited

###### <sup>1</sup> Depends on the template engine.

[Assemble]: https://github.com/assemble/assemble
[gray-matter]: https://github.com/assemble/gray-matter


### How Phaser Works

Without getting into too much detail, Phaser disintegrates your templates, data, and front matter into a stream of molecules before being sent to the Pattern Buffer, which is a large cylindrical tank surrounded by superconducting electromagnetic coils. Here, the object to be generated is stored momentarily before actually beaming to its destination.

From the Pattern Buffer, the molecular stream and the coded instructions pass through a number of subsystems before reaching the emitter. These include the Subspace, Doppler, and Heisenberg Compensators. Each works to ensure that the received stream is being transmitted or re-materializing in the correct phase, frequency, and so on.

It's true. This is exactly how Phaser works. More or less.

## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated by [grunt-readme](https://github.com/assemble/grunt-readme) on Tuesday, February 18, 2014._
## Ease of Use

> Phaser loves users

So its number one priorty is ease-of use. For new users **zero configuration** is required to get started. Once Phaser is installed, simply enter `phaser` in command line, and you're off and running.

For more experienced users, Phaser offers _more than 50 template tags and filters, includes and partial caching, comment parsing, YAML Front Matter (or Coffee Front Matter!), plugins, mixins, tons of helpful JavaScript and Node.js utilites_, and lots more.

## API

> Phaser also loves developers

Offering an extensive API and tools for building plugins or extending Phaser in other ways.

# Features

* Lo-Dash templates and mixins
* The full power of JavaScript
* Filters
* Tags
* Partial Caching
* Mixins
* Templates can be used directly, cached as JavaScript, and/or via `require` statements
* Uses [gray-matter][] to support both YAML Front Matter and Coffee Front Matter
* Easily add a **Table of Contents** to any file
* Generate a **multi-file Table of Contents**, along with relative links to each file AND section
* Comment parsing (basic)
* Extensive API
* File-system Utilities
* Logging
* Lots more! So much more. Much much more. So much more that you don't even know how much more it's so much. I don't know where to start.

## How does Phaser differ from Assemble?

Phaser was specifically created to make it easier to manage documentation for GitHub projects. In a nutshell:

* Use [Assemble][] to build components, sites, blogs and other projects where HTML is the end result.
* Use Phaser to generate and maintain markdown documentation for your [Assemble][] (or non-Assemble) projects.

### Comparison

While both engines can be extended to accomplish most of the following features, this table describes what you should expect from each _out-of-the-box_:

**Feature** | **[Assemble][]** | **Phaser**
------- | -------- | ------
**Summary** | Build HTML projects from modular components and data | Generate markdown documentation
**Focus** | Power, granular access to context, components | Speed, ease-of-use, command-line
**Template Engine** | Handlebars by default, any template engine can be added. | Lo-Dash
**Extensions** | Plugins, Lo-Dash Mixins, Helpers, Filters, Tags <sup>[1](#1-depends-on-the-template-engine)</sup> | Plugins, Lo-Dash Mixins, Filters, Tags
**Static Blogs** | Yes | No
**Static Sites** | Yes | No
**HTML Documentation** | Yes | Limited.
**Markdown Documentation** | Limited | Yes
**Markdown to HTML** | Yes | Limited

##### <sup>1</sup> Depends on the template engine.

[Assemble]: https://github.com/assemble/assemble
[gray-matter]: https://github.com/assemble/gray-matter


## How Phaser Works

Without getting into too much detail, Phaser disintegrates your templates, data, and front matter into a stream of molecules before being sent to the Pattern Buffer, which is a large cylindrical tank surrounded by superconducting electromagnetic coils. Here, the object to be generated is stored momentarily before actually beaming to its destination.

From the Pattern Buffer, the molecular stream and the coded instructions pass through a number of subsystems before reaching the emitter. These include the Subspace, Doppler, and Heisenberg Compensators. Each works to ensure that the received stream is being transmitted or re-materializing in the correct phase, frequency, and so on.

It's true. This is exactly how Phaser works. More or less.
* package.json | alt config object
* metadata

## metadata

Unless overridden in the options, Phaser will attempt to process templates using only the data from your project's [package.json](./package.json). Thus, using only the default settings our context might look something like this:

```js
{
  "name": "phaser",
  "description": "Documentation generator. Build docs from markdown, Lo-Dash templates, includes, and YAML front matter.",
  "version": "0.1.0",
  "homepge": "https://github.com/jonschlinkert/phaser",
  "dependencies": {
    "fs-utils": "~0.1.11",
    "gray-matter": "~0.2.3",
    "findup-sync": "~0.1.2",
    "frep": "~0.1.3",
    "globule": "~0.2.0",
    "lodash": "~2.4.1",
    "marked-toc": "~0.1.5",
    "template": "~0.1.3"
  },
  // continued...
}
```

For the majority of projects, this will be enough. _But Phaser gives you as much flexibility as you need to extend the context._


# Context

Your project's [package.json](./package.json) will be used as the default config object, which is passed as context to templates. If no other config object is passed to the `config` option, and no metadata is passed in through other means, then this is the context that will be used to process your templates.

## Overriding default config
As mentioned in the previous section, the default config object, `package.json`, can be explicitly overridden by passing an object to `options.config`. Example:

```js
// Raw object
phaser(str, {config: {name: 'foo'}});

// String (filepath)
phaser(str, {config: 'path/to/*.json'});
```

## Extending the Context
From least specific to most specific, this is how the context is extended. In other words, the **last wins**:

* `filters|functions`: [Lo-Dash filters]() and custom functions may be used to build up the context when other more conventional means aren't available. For example, an `authors()` mixin/function might be used to read the [AUTHORS](./AUTHORS) file, and then extend the context with the names of the authors therein.
* `options`: Variables defined directly on the `options` object, e.g. `{name: "phaser"}`.
* `options.data`: Variables from the `options.data` property. This is a very flexible property:
  - `Object`: You may pass a raw object directly to the property, e.g. `{data: {name: "phaser"}}`.
  - `String`If you pass a string, Phaser will try to require it. If that doesn't work, Phaser will try to read it in.
  - Minimatch (glob) patterns may be used, and with either JSON or YAML files, e.g. `{data: 'foo/bar/**/*.{json,yml}'}`
* `metadata`: Front matter



For example, let's say we need to extend the context with some data that isn't in our example `package.json`, such as `author.name`. We have a few options:

* `options.data`: Define a raw `object`|`array` directly on the `options.data` object.
* Front matter in the templates themselves
* JSON / YAML data files, e.g. `foo.json`, `foo.yml` etc.

## options.config vs options.data
Although the options are similar, they serve a different purpose:

* `options.config`: overrides the default config object, so **no data** from `package.json` will be used as the context.
* `options.data`: extend the config object, so **both** data from `package.json` and from `options.data` will be used to extend the context.


### Raw

Example:

```js
options: {
  author: {
    name: "Jon Schlinkert",
    url: "https://github.com/jonschlinkert"
  }
}
```

### Front Matter

Example:

```markdown
---
username: jonschlinkert
---
Visit [some link](https://github.com/{%= username %}/foo) to learn more!

```

### Data files

`foo.json, bar/baz/*.json`

```json
{
  "author": {
    "name": "Jon Schlinkert",
    "url": "https://github.com/jonschlinkert"
  }
}
```

#### namespacing
Given we have a file named `author.json` with the following contents:

**namespace: false**

```json
{
  "author": {
    "name": "Jon Schlinkert",
    "url": "https://github.com/jonschlinkert"
  }
}
```

**namespace: true**
The following object would be merged into the context:

```json
{
  "author": {
    "name": "Jon Schlinkert",
    "url": "https://github.com/jonschlinkert"
  }
}
```
```js
{
  // Logging
  verbose: true,
  debug: 'tmp/ctx.json',

  // Metadata
  namespace: '',

  // Extensions
  filters: 'test/filters/*.js',
  contributing: true,

  // Glob defaults
  matchBase: true,

  // Processing
  delimiters: ['{%', '%}'],
  replacements: [],
}
```
# Template Examples

> Copy/paste any of these examples into your templates as a starting point.


## Name

```js
{%= name %}
```
> phaser


## Version

```js
{%= version %}
v{%= version %}
{%= version ? " v" + version : "" %}
{%= version ? " * @version " + version + "\\n" : "" %}
```
> 0.1.3
> v0.1.3
> v0.1.3
> * @version 0.1.3\n

## Description

```js
{%= description %}
{%= description ? " * " + description + "\\n" : "" %}
```
> Generate your README from a template. If you already use Grunt, this is a no brainer.
> * Generate your README from a template. If you already use Grunt, this is a no brainer.\n



## Homepage

```js
{%= homepage ? " | " + homepage : "" %}
{%= homepage ? " * " + homepage + "\n" : "" %}
{%= homepage ? " * @docs " + homepage + "\\n" : "" %}
```
>  | https://github.com/assemble/phaser
> * https://github.com/assemble/phaser
>
>  * @docs https://github.com/assemble/phaser\n



## AUTHORS

[AUTHORS](NPM https://npmjs.org/doc/json.html)

> If there is an `AUTHORS` file in the root of your package, npm will treat each line as a `Name <email> (url)` format, where email and url are optional. Lines which start with a # or are blank, will be ignored. **[-- NPM]((NPM https://npmjs.org/doc/json.html)**

To use `author` data from `package.json`:

```js
[{%= author.name %}]({%= author.url %})
```
> [Jon schlinkert](http://github.com/jonschlinkert)

```js
{%= author.name ? " * @author " + author.name + "\\n" : "" %}
{%= author.url ? " * @link " + author.url + "\\n" : "" %}
```
>  * @author Jon Schlinkert\n
>  * @link https://github.com/jonschlinkert\n

Or, if you prefer to use an `AUTHORS` file in the root of the project:

```js
[{%= authors[0].name %}]({%= authors[0].url %})
```
> [Jon schlinkert](http://github.com/jonschlinkert)
> [Brian Woodward](http://github.com/doowb)


## Time and date

```js
{%= grunt.template.today() %}
```
> Tue Sep 17 2013 18:38:42

```js
{%= grunt.template.today("yyyy") %}
```
> 2013

```js
{%= grunt.template.today("yyyy-mm-dd") %}
```
> 2013-09-17

```js
_This file was generated on {%= grunt.template.date("fullDate") %}._
```
> _This file was generated on Monday, September 30, 2013._


## Banner

```js
/*!
 * {%= name %} v{%= version %},  {%= grunt.template.today("yyyy-mm-dd") %}
 * {%= homepage %}
 * Copyright (c) {%= grunt.template.today("yyyy") %} {%= author %}, contributors.
 * {%= _.license() %}.
 */
```

> /*!
 * phaser v0.1.3,  2013-09-22
 * https://github.com/assemble/phaser
 * Copyright (c) 2013 [object Object], contributors.
 * Released under the MIT license.
 */

## Changelog / Release History

```js
{%= include("docs-changelog.md") %}
```

> * 2013-09-21   **v0.1.3**   Completely refactored. Adds a lot of documentation.
 * 2013-09-19   **v0.1.0**   First commmit.


Or:

```js
 * {%= grunt.template.today('yyyy') %}   v0.1.0   First commit
```
> * 2013   v0.1.0   First commit



## License

```
{%= _.license() %}
```
> Released under the [MIT license](./LICENSE-MIT).



## Contributors

```js
{%= _.contributors() %}
```
> Jon Schlinkert
> Brian Woodward


## Metadata

You can mix and match formats in the `metadata` option, all of the following shoulw work:

```js
grunt.initConfig({
  pkg: 'package.json',
  foo: 'package.json',
  bar: grunt.file.readJSON('package.json'),
  qux: grunt.file.readJSON('test/fixtures/data/one.json'),
  baz: ['<%= bar %>'],

  config: {
    one: 'test/fixtures/data/one.json',
    two: 'test/fixtures/data/two.yml',
    three: 'test/fixtures/data/three.json',
    pkg: grunt.file.readJSON('package.json'),
    qux: grunt.file.readJSON('test/fixtures/data/one.json')
  },


  // Obviously you can't have duplicate properties on an
  // object, so this is just for illustrative purposes
  // The point is.. you can get just about as crazy as you want.
  readme: {
    options: {
      metadata: ['<%= pkg %>', '<%= qux %>'],
      metadata: ['<%= config.pkg %>', '<%= config.qux %>'],
      metadata: ['<%= pkg %>', {foo: 'bar'}],
      metadata: ['<%= pkg %>', 'test/fixtures/data/*.{json,yml}'],
      metadata: '<%= config.one %>',
      metadata: 'test/fixtures/data/one.json',
      metadata: ['test/fixtures/data/one.json', 'test/fixtures/data/two.yml'],
      metadata: ['test/fixtures/data/two.yml', {description: 'Foo', name: 'Bar'}, '<%= pkg %>', 'test/fixtures/data/*.json', {alpha: 1, beta: 2 }, {kappa: 3, gamma: 4 }, {zed: {orange: 5, apple: 6 } }, '<%= config.one %>', {name: 'New'}, {quux: '<%= qux %>'}, ['one', {pkg: '<%= config.pkg %>'}, 'three'], {arr: ['one', 'two', 'three']}],
      metadata: ['<%= config.one %>', '<%= config.two %>'], metadata: 'test/fixtures/data/*.{json,yml}',
      metadata: ['test/fixtures/data/*.{json,yml}'],
      metadata: ['test/fixtures/data/*.json', 'test/fixtures/data/*.yml'],
      metadata: ['test/fixtures/data/*.json', '<%= config.two %>'],
      metadata: {
        description: 'Foo',
        name: 'Bar'
      }
    }
  }
}
```
## templates

## Readme template

* `docs/`
* `node_modules/grunt-readme/templates/`
* `options.readme`
* `options.resolve.readme`


## YAML Front Matter
Add YAML front matter to documents to extend the metadata that is supplied to your project's templates.

```
---
username: jonschlinkert
---
```
This is probably most useful when:
1. You need to use the same or similar templates on a number of different projects
1. You want to supply data to the templates that won't typically be found in package.json


## Code Comments
Code comments used in markdown templates will be stripped from the rendered files as long as they adhere to the following syntax:

```handlebars
// Whitespace inside comments is insignificant
{{!-- foo --}}
{{! foo }}
```

## Escaping

### Escaping hashes
This task automatically adjusts heading levels in included templates. For example, `#` is adjusted to `##`, so that heading levels "line up" properly after the README is built.

This can cause problems if you're using hashes for a reason other than headings, such as CSS Id's in code comments. So to prevent phaser from converting `#id {}` to `##id {}`, just add a  single backtick before the hash: <code>`#id {}</code>.

### Escaping Lo-Dash templates
To prevent Lo-Dash from attempting to evaluat templates that shouldn't be (_as with code examples_), just use square brackets instead of curly braces in any templates that have similar patterns to these: `{%= .. %}`, `{%- .. %}`, and `{% .. %}`. The square brackets will be replaced with curly braces in the rendered output.

# Front Matter

> Phaser uses [gray-matter]() for parsing front-matter. So in addition to YAML, you can also use JSON, Coffee, or plan JavaScript.


## Examples

```markdown
---coffee
json = (src) ->
  return require('fs-utils').readJSONSync(src)

pkg = json('package.json')
---

> {%= pkg.name %}

```



```markdown
---coffee
# Variables
user = 'jonschlinkert'

# Functions
reverse = (src) ->
  src.split('').reverse().join('')

include = (src) ->
  return require('fs').readFileSync(src)

# Method call
reverseUser = reverse(user)
---

{%= user %}
{%= reverse(user) %}
{%= include('file.md') %}
{%= reverseUser %}
```
filters use the following formats:

* `_.mixin()`: when used in JavaScript
* `{%= _.mixin() %}`: when used in templates


## "include" filters

> Three different filters are built into the task for including "external" content: `include`, `doc` and `resolve`. Each is used for a different purpose.

Here is a summary of what they do (settings for the `include` and `doc` filters can be customized in the task options):

* `{%= include("file.md") %}`: include a file (or files using [minimatch][minimatch] patterns) from the `./templates/` directory of _the phaser task_.
* `{%= docs("file.md") %}`:  include a file (or files using [minimatch][minimatch] patterns) from the `./docs/` directory of _your project_.
* `{%= _.resolve("file.md") %}`: include a **specific file** from *node_modules*`.
* `{%= _.contrib("file.md") %}`: include a file (or files using [minimatch][minimatch] patterns) from the `./contrib/` directory of _the phaser task_. This mixin is for the [Assemble](http://assemble.io).


### include()
Use the `include` mixin in templates to pull in content from other files:

```js
{%= include("examples.md") %}
```

[Minimatch][minimatch] patterns may also be used:

```js
{%= include("docs-*.md") %}
```

Unless overridden in the `templates` option, the `include` mixin will use the `./node_modules/phaser/tasks/templates/` directory (from the root of your project) as the `cwd` for templates.


### docs()
Same as the `include` mixin but is hard-coded to use the `docs/` folder of your project as the `cwd` for templates.


### _.resolve()
Use the `resolve` mixin in templates to include content _from named NPM modules listed in `devDependencies`_:

```js
{%= _.resolve("my-boilerplate-readme") %}
```

where `my-boilerplate-readme` is the name of a `devDependency` currently installed in `node_modules`.

For the `resolve` mixin to work:

1. The referenced file must be listed in the `devDependencies` of your project's `package.json`,
1. It must be installed in `node_modules`, and
1. The referenced project must have the file defined in the `main` property of that project's `package.json`.
1. Last, in your templates make sure you _use the name of the module, not the name of the file to "include"_.

**example**
In the `package.json` of the project that will store your templates, you might do something like:

```js
{
  "name": "my-boilerplate-readme",
  "main": "README.tmpl.md"
}
```

## convenience filters

### _.meta()

Get the value of any property in `package.json`. Example:

```js
{%= _.meta('name') %}
{%= _.meta('version') %}
{%= _.meta('contributors') %}
{%= _.meta('keywords') %}
```
A second paramter can be passed in to set the indentation on returned JSON: `{%= _.meta('contributors', 4) %}`. _This only works for stringified objects_.

Also, if left undefined (`{%= _.meta() %}`) the mixin will return the entire metadata object (by default, this is the entire contents of `package.json`):

### _.jsdocs()
Parse and extract comments from specified JavaScript files to generate output for each code comment block encountered.

```js
{%= _.jsdocs("tasks/readme.js") %}
```

Currently, only the block is output and a link to the block in the source code is provided. This needs to be updated to only generate the markdown for jsdoc comments and to do something to make them more readable.


### _.copyright()
Add a copyright statement, including the name of the author and the year, or range of years, the copyright is in effect. The primary advantage of using this is to ensure that the copyright dates are correct.

Parameters:

* `Number`: Optionally define the start year of the project.

Examples:

```js
{%= _.copyright() %}
// => Copyright (c) 2013 Jeffrey Herb, contributors.

{%= _.copyright('2011') %}
// => Copyright (c) 2011-2013 Jeffrey Herb, contributors.
```


### _.license()
Add a "license statement" to the README, using the license(s) specified in package.json. If you maintain a number of projects, some of which might have more than one license, while others only have one, you can use the `_.license()` mixin to automate the process of adding license info.

Examples:

```js
{%= _.license() %}
```
> Released under the MIT license

Customize the output:

```js
{%= _.license('Licensed under the ') %}
```
> Licensed under the MIT license


### _.contributors()
Render contributors listed in the project's package.json.


### _.username()
Extract the username or org from URLs in the project's package.json. The mixin will extract the username from the `homepage` property if it exists. If not, it will try to extract the username from the `git.url` property.


### _.homepage()
Extract the homepage URL from the project's package.json. If a `homepage` property doesn't exist, the mixin will create a `homepage` URL using the value defined in the `git.url` property.

[minimatch]: https://github.com/isaacs/minimatch

## Overview of available options

[Also see examples →](./DOCS.md#examples)
```js
readme: {
  options: {
    readme: '',
    templates: '',
    metadata: '',
    sep: '\n',
    prefixes: [],
    contributing: true
  }
}
```

## readme
Type: `String`
Default: `./node_modules/phaser/tasks/templates/README.tmpl.md`

By default, if no options are specified the task will look for a `README.md.tmpl` template to use, if none is found the task will use the "starter" file supplied by `phaser` (more detail below). Example:

```js
readme: {
  options: {
    readme: 'path/to/custom/README.md.tmpl'
  }
}
```

1. If the `readme` options is defined, the task will use that custom template.
1. If (1) is undefined, the task uses the directory defined by `options: { docs: ''}`
1. If (2) is undefined, the task checks if `README.tmpl.md` exists in the `./docs` directory (without having to define it in the options)
1. if (3) is undefined, `options: { resolve: { readme: ''}}` attempts to automagically use a `README.tmpl.md` template from `node_modules`. The module must must be defined in `devDependencies`. Note that for a README template to resolve properly from `node_modules`, the `main` property in the `package.json` of the module being referenced must specify the path to the template. This option is probably most useful when you plan to use the same README template on a number of projects.
1. If (4) is undefined, the task uses the "starter" README template from `phaser`.


## metadata
Type: `Object`
Default: `package.json`

Optional source of metadata to _extend the data object_ that is passed as context into the templates. Context of the data object is the value of `this`, and properties in `package.json` will be ignored when matching properties are defined on the `metadata` object. Example:

```js
readme: {
  options: {
    metadata: {
      name: 'Foo',
      description: 'This is foo.'
    }
  }
}
```

### data files

Or specify the path or paths to any `.json` or `.yml` files to use. Any of the following formats will work:

```js
readme: {
  options: {
    metadata: 'docs/metadata.json'
  }
}
```

Array of files:

```js
readme: {
  options: {
    metadata: ['docs/one.json', 'docs/two.yml'],
  }
}
```

[minimatch][] (wilcard/globbing) patterns:

```js
readme: {
  options: {
    metadata: ['docs/*.{json,yml}', 'foo.json']
  }
}
```


Since context is the value of "this", the `metadata` path is not required in templates, only property names:

* `{%= name %}` (e.g. not `{%= metadata.name %}`) => `Foo`
* `{%= description %}` => `This is foo.`



### docs
Type: `String`
Default: `./docs/`

Override the default directory for files included using `{%= docs('foo.md') %}`. This defaults to the `./docs` directory in the root of your project.

```js
readme: {
  options: {
    docs: 'foo/'
  }
}
```


### templates
Type: `String`
Default: `./node_modules/phaser/tasks/templates/` (relative to your project)

Override the default `cwd` for files included by using `{%= include('foo.md') %}`. By default, the `include` mixin will look for files in `./node_modules/phaser/tasks/templates` directory, where some starter templates are stored. ([Also see examples →](./DOCS.md#examples))

```js
readme: {
  options: {
    templates: 'bar/'
  }
}
```


## remove
Type: `Array`
Default: `grunt|helper|mixin`

Any string defined in the remove will be removed from the content passed in using the `{%= _.shortname() %}` template. Example:

```js
readme: {
  options: {
    remove: ["foo", "bar", "baz"]
  }
}
```

Given a `package.json` with the following property:

```json
{
  "name": "foo-module"
}
```

when referenced in a template like this:

```js
# {%= _.titleize(_.shortname(name)) %}
```

will renders to:

```
# Module
```

## contributing
Type: `Boolean`
Default: `True`

By default, the README task copies a basic `CONTRIBUTING.md` file to the root of your project. If one exists, the task will skip this. If you wish to prevent the task from adding this file to your project, set the `contributing` option to `false`.


## sep
Type: `String`
Default: `\n`

Separator to use between sections of content that is included using the `include` or `doc` filters (more about these in the "filters" section below). This option is more useful when you use [minimatch][] patterns to specify the files to include.

The `sep` option can either be defined in the task options:

```js
readme: {
  options: {
    sep: '\n***\n'
  }
}
```

or as a second parameter in the `include` or `doc` filters.

* `{%= include("docs-*.md", "***") %}` (more below...)
* `{%= docs("*.md", "\n***\n") %}` (more below...)

[minimatch]: https://github.com/isaacs/minimatch

Example document:

```js
# {%= name %}

> {%= description %}

{%= toc %}

## Overview
{%= doc("overview.md") %}

## Options
{%= doc("options.md") %}

## Examples
{%= doc("examples.md") %}

## License and Copyright
{%= copyright %}
{%= license %}
```
## Tags, Filters and Variables

Which is which?!

For the most part, **variables** look like this

```
{%= foo %}
```

However, **tags** and **filters** both look like this:

```
{%= bar() %}
```

with the difference _(in Phaser)_ being that:

* **tags**: generate, include or otherwise "add" content of some kind
* **filter**: modify, filter, transform or otherwise alter content in some way

### Example: Tags vs. Filters

In this example:

* `condense` is a filter
* `include` is a tag

```
{%= condense(include('foo')) %}
```
### Install with [npm](npmjs.org)

```bash
npm i phaser --save-dev
```

Now that Phaser is installed, run:

```
phaser
```

That wasn't so hard, was it?
* defaults
* options

## metadata
Type: `object|array|string`

Default: `undefined`

* `string`: When defined as a string,

## variable
Type: `string`

Default: `undefined`

Lo-Dash opts...

## namespace
Type: `boolean|string`

Default: `undefined` (options: `true`|`"only"`)

When `namespace` defined, an object is created for each data file, where the top level property on the object is the name of the file itself, and the data contained within the file is extended into that object. [See examples](#namespacing).

## omit

Omit properties from the context.

Type: `Array`

Defaults: `[]`

Returns: `Object`

Useful if properties are added via options, but should not be on the context.

