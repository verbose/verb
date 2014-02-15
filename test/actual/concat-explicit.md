# BASIC

> Markdown documentation generator. Build docs from markdown, Lo-Dash templates, includes, and YAML front matter.



## Example "README" template

## Template Examples

> Copy/paste any of these examples into your templates as a starting point.


### Name

```js
{%= name %}
```
> BASIC


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
>  | https://github.com/assemble/BASIC
> * https://github.com/assemble/BASIC
>
>  * @docs https://github.com/assemble/BASIC\n



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
 * BASIC v0.1.3,  2013-09-22
 * https://github.com/assemble/BASIC
 * Copyright (c) 2013 [object Object], contributors.
 * Released under the MIT license.
 */

### Changelog / Release History

```js
{%= _.include("docs-changelog.md") %}
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
* `{%= _.doc("foo") %}` is used to included files from your project's `./docs` directory
* `{%= _.include("foo") %}` is used to include boilerplate files from phaser

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
Code comments may be used in markdown templates, and they will be stripped from the rendered README as long as they adhere to the following syntax:

```handlebars
{{!-- foo --}}
{{! foo }}
{{!foo}}
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

Override the default directory for files included using `{%= _.doc('foo.md') %}`. This defaults to the `./docs` directory in the root of your project.

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

Override the default `cwd` for files included by using `{%= _.include('foo.md') %}`. By default, the `include` mixin will look for files in `./node_modules/phaser/tasks/templates` directory, where some starter templates are stored. ([Also see examples →](./DOCS.md#examples))

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

* `{%= _.include("docs-*.md", "***") %}` (more below...)
* `{%= _.doc("*.md", "\n***\n") %}` (more below...)

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
{%= _.include("docs-changelog.md") %}
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
Find a bug? Have a feature request? Please [create an Issue](https://github.com/jonschlinkert/phaser/issues).

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


# phaser

> Markdown documentation generator. Build docs from markdown, Lo-Dash templates, includes, and YAML front matter.

Please [report any bugs or feature requests](https://github.com/jonschlinkert/phaser/issues/new), thanks!

* [Quickstart](#quickstart)
* [Examples](#examples)
* [Options](#options)
* [Config](#config)
* [Defaults](#defaults)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)


## Quickstart
```bash
npm install phaser --save-dev
```

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
Find a bug? Have a feature request? Please [create an Issue](https://github.com/jonschlinkert/phaser/issues).

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

_This file was generated by [grunt-readme](https://github.com/assemble/grunt-readme) on ._
# [Examples](docs/docs-examples.md)

* [Template Examples](docs/docs-examples.md/#template-examples)
  * [Name](docs/docs-examples.md/#name)
  * [Version](docs/docs-examples.md/#version)
  * [Description](docs/docs-examples.md/#description)
  * [Homepage](docs/docs-examples.md/#homepage)
  * [AUTHORS](docs/docs-examples.md/#authors)
  * [Time and date](docs/docs-examples.md/#time-and-date)
  * [Banner](docs/docs-examples.md/#banner)
  * [Changelog / Release History](docs/docs-examples.md/#changelog-release-history)
  * [License](docs/docs-examples.md/#license)
  * [Contributors](docs/docs-examples.md/#contributors)
  * [Metadata](docs/docs-examples.md/#metadata)

# [Features](docs/docs-features.md)

* [templates](docs/docs-features.md/#templates)
* [Readme template](docs/docs-features.md/#readme-template)
* [YAML Front Matter](docs/docs-features.md/#yaml-front-matter)
* [Code Comments](docs/docs-features.md/#code-comments)
* [Escaping](docs/docs-features.md/#escaping)
  * [Escaping hashes](docs/docs-features.md/#escaping-hashes)
  * [Escaping Lo-Dash templates](docs/docs-features.md/#escaping-lo-dash-templates)

# [Front-Matter](docs/docs-front-matter.md)

* [Front Matter](docs/docs-front-matter.md/#front-matter)
  * [Examples](docs/docs-front-matter.md/#examples)

# [Mixins](docs/docs-mixins.md)

* ["include" filters](docs/docs-mixins.md/#include-filters)
  * [_.include()](docs/docs-mixins.md/#include)
  * [_.doc()](docs/docs-mixins.md/#doc)
  * [_.resolve()](docs/docs-mixins.md/#resolve)
* [convenience filters](docs/docs-mixins.md/#convenience-filters)
  * [_.meta()](docs/docs-mixins.md/#meta)
  * [_.jsdocs()](docs/docs-mixins.md/#jsdocs)
  * [_.copyright()](docs/docs-mixins.md/#copyright)
  * [_.license()](docs/docs-mixins.md/#license)
  * [_.contributors()](docs/docs-mixins.md/#contributors)
  * [_.username()](docs/docs-mixins.md/#username)
  * [_.homepage()](docs/docs-mixins.md/#homepage)

# [Options](docs/docs-options.md)

* [Overview of available options](docs/docs-options.md/#overview-of-available-options)
* [readme](docs/docs-options.md/#readme)
* [metadata](docs/docs-options.md/#metadata)
  * [data files](docs/docs-options.md/#data-files)
  * [docs](docs/docs-options.md/#docs)
  * [templates](docs/docs-options.md/#templates)
* [remove](docs/docs-options.md/#remove)
* [contributing](docs/docs-options.md/#contributing)
* [sep](docs/docs-options.md/#sep)

<!doctype html>
<html lang="en">
  <head>
    
  </head>
  <body>
    <div class="container bs-docs-container">
      <h1 id="phaser">phaser</h1>
<blockquote>
<p>Markdown documentation generator. Build docs from markdown, Lo-Dash templates, includes, and YAML front matter.</p>
</blockquote>
<p>Please <a href="https://github.com/jonschlinkert/phaser/issues/new">report any bugs or feature requests</a>, thanks!</p>
<h2 id="quickstart">Quickstart</h2>
<pre><code class="lang-bash">npm install phaser --save-dev
</code></pre>
<h2 id="examples">Examples</h2>
<p>Example document:</p>
<pre><code class="lang-js"># {%= name %}

&gt; {%= description %}

{%= toc %}

### Overview
{%= doc(&quot;overview.md&quot;) %}

### Options
{%= doc(&quot;options.md&quot;) %}

### Examples
{%= doc(&quot;examples.md&quot;) %}

### License and Copyright
{%= copyright %}
{%= license %}
</code></pre>
<h2 id="options">Options</h2>
<ul>
<li>defaults</li>
<li>options</li>
</ul>
<h3 id="metadata">metadata</h3>
<p>Type: <code>object|array|string</code></p>
<p>Default: <code>undefined</code></p>
<ul>
<li><code>string</code>: When defined as a string,</li>
</ul>
<h3 id="variable">variable</h3>
<p>Type: <code>string</code></p>
<p>Default: <code>undefined</code></p>
<p>Lo-Dash opts...</p>
<h3 id="namespace">namespace</h3>
<p>Type: <code>boolean|string</code></p>
<p>Default: <code>undefined</code> (options: <code>true</code>|<code>&quot;only&quot;</code>)</p>
<p>When <code>namespace</code> defined, an object is created for each data file, where the top level property on the object is the name of the file itself, and the data contained within the file is extended into that object. <a href="#namespacing">See examples</a>.</p>
<h2 id="config">Config</h2>
<ul>
<li>package.json | alt config object</li>
<li>metadata</li>
</ul>
<h3 id="metadata">metadata</h3>
<p>Unless overridden in the options, Phaser will attempt to process templates using only the data from your project&#39;s <a href="./package.json">package.json</a>. Thus, using only the default settings our context might look something like this:</p>
<pre><code class="lang-js">{
  &quot;name&quot;: &quot;phaser&quot;,
  &quot;description&quot;: &quot;Documentation generator. Build docs from markdown, Lo-Dash templates, includes, and YAML front matter.&quot;,
  &quot;version&quot;: &quot;0.1.0&quot;,
  &quot;homepge&quot;: &quot;https://github.com/jonschlinkert/phaser&quot;,
  &quot;dependencies&quot;: {
    &quot;fs-utils&quot;: &quot;~0.1.11&quot;,
    &quot;gray-matter&quot;: &quot;~0.2.3&quot;,
    &quot;findup-sync&quot;: &quot;~0.1.2&quot;,
    &quot;frep&quot;: &quot;~0.1.3&quot;,
    &quot;globule&quot;: &quot;~0.2.0&quot;,
    &quot;lodash&quot;: &quot;~2.4.1&quot;,
    &quot;marked-toc&quot;: &quot;~0.1.5&quot;,
    &quot;template&quot;: &quot;~0.1.3&quot;
  },
  // continued...
}
</code></pre>
<p>For the majority of projects, this will be enough. <em>But Phaser gives you as much flexibility as you need to extend the context.</em></p>
<h2 id="context">Context</h2>
<p>Your project&#39;s <a href="./package.json">package.json</a> will be used as the default config object, which is passed as context to templates. If no other config object is passed to the <code>config</code> option, and no metadata is passed in through other means, then this is the context that will be used to process your templates.</p>
<h3 id="overriding-default-config">Overriding default config</h3>
<p>As mentioned in the previous section, the default config object, <code>package.json</code>, can be explicitly overridden by passing an object to <code>options.config</code>. Example:</p>
<pre><code class="lang-js">// Raw object
phaser(str, {config: {name: &#39;foo&#39;}});

// String (filepath)
phaser(str, {config: &#39;path/to/*.json&#39;});
</code></pre>
<h3 id="extending-the-context">Extending the Context</h3>
<p>From least specific to most specific, this is how the context is extended. In other words, the <strong>last wins</strong>:</p>
<ul>
<li><code>filters|functions</code>: <a href="">Lo-Dash filters</a> and custom functions may be used to build up the context when other more conventional means aren&#39;t available. For example, an <code>authors()</code> mixin/function might be used to read the <a href="./AUTHORS">AUTHORS</a> file, and then extend the context with the names of the authors therein.</li>
<li><code>options</code>: Variables defined directly on the <code>options</code> object, e.g. <code>{name: &quot;phaser&quot;}</code>.</li>
<li><code>options.data</code>: Variables from the <code>options.data</code> property. This is a very flexible property:<ul>
<li><code>Object</code>: You may pass a raw object directly to the property, e.g. <code>{data: {name: &quot;phaser&quot;}}</code>.</li>
<li><code>String</code>If you pass a string, Phaser will try to require it. If that doesn&#39;t work, Phaser will try to read it in.</li>
<li>Minimatch (glob) patterns may be used, and with either JSON or YAML files, e.g. <code>{data: &#39;foo/bar/**/*.{json,yml}&#39;}</code></li>
</ul>
</li>
<li><code>metadata</code>: Front matter</li>
</ul>
<p>For example, let&#39;s say we need to extend the context with some data that isn&#39;t in our example <code>package.json</code>, such as <code>author.name</code>. We have a few options:</p>
<ul>
<li><code>options.data</code>: Define a raw <code>object</code>|<code>array</code> directly on the <code>options.data</code> object.</li>
<li>Front matter in the templates themselves</li>
<li>JSON / YAML data files, e.g. <code>foo.json</code>, <code>foo.yml</code> etc.</li>
</ul>
<h3 id="options-config-vs-options-data">options.config vs options.data</h3>
<p>Although the options are similar, they serve a different purpose:</p>
<ul>
<li><code>options.config</code>: overrides the default config object, so <strong>no data</strong> from <code>package.json</code> will be used as the context.</li>
<li><code>options.data</code>: extend the config object, so <strong>both</strong> data from <code>package.json</code> and from <code>options.data</code> will be used to extend the context.</li>
</ul>
<h4 id="raw">Raw</h4>
<p>Example:</p>
<pre><code class="lang-js">options: {
  author: {
    name: &quot;Jon Schlinkert&quot;,
    url: &quot;https://github.com/jonschlinkert&quot;
  }
}
</code></pre>
<h4 id="front-matter">Front Matter</h4>
<p>Example:</p>
<pre><code class="lang-markdown">---
username: jonschlinkert
---
Visit [some link](https://github.com/{%= username %}/foo) to learn more!
</code></pre>
<h4 id="data-files">Data files</h4>
<p><code>foo.json, bar/baz/*.json</code></p>
<pre><code class="lang-json">{
  &quot;author&quot;: {
    &quot;name&quot;: &quot;Jon Schlinkert&quot;,
    &quot;url&quot;: &quot;https://github.com/jonschlinkert&quot;
  }
}
</code></pre>
<h5 id="namespacing">namespacing</h5>
<p>Given we have a file named <code>author.json</code> with the following contents:</p>
<p><strong>namespace: false</strong></p>
<pre><code class="lang-json">{
  &quot;author&quot;: {
    &quot;name&quot;: &quot;Jon Schlinkert&quot;,
    &quot;url&quot;: &quot;https://github.com/jonschlinkert&quot;
  }
}
</code></pre>
<p><strong>namespace: true</strong>
The following object would be merged into the context:</p>
<pre><code class="lang-json">{
  &quot;author&quot;: {
    &quot;name&quot;: &quot;Jon Schlinkert&quot;,
    &quot;url&quot;: &quot;https://github.com/jonschlinkert&quot;
  }
}
</code></pre>
<h2 id="defaults">Defaults</h2>
<pre><code class="lang-js">{
  // Logging
  verbose: true,
  debug: &#39;tmp/ctx.json&#39;,

  // Metadata
  namespace: &#39;&#39;,

  // Extensions
  filters: &#39;test/filters/*.js&#39;,
  contributing: true,

  // Glob defaults
  matchBase: true,

  // Processing
  delimiters: [&#39;{%&#39;, &#39;%}&#39;],
  replacements: [],
}
</code></pre>
<h2 id="contributing">Contributing</h2>
<p>Find a bug? Have a feature request? Please <a href="https://github.com/jonschlinkert/phaser/issues">create an Issue</a>.</p>
<p>In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][], and build the documentation with <a href="https://github.com/assemble/grunt-readme">grunt-readme</a>.</p>
<p>Pull requests are also encouraged, and if you find this project useful please consider &quot;starring&quot; it to show your support! Thanks!</p>
<h2 id="authors">Authors</h2>
<p><strong>Jon Schlinkert</strong></p>
<ul>
<li><a href="https://github.com/jonschlinkert">github/jonschlinkert</a></li>
<li><a href="http://twitter.com/jonschlinkert">twitter/jonschlinkert</a></li>
</ul>
<h2 id="license">License</h2>
<p>Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license</p>
<hr>
<p><em>This file was generated by <a href="https://github.com/assemble/grunt-readme">grunt-readme</a> on .</em></p>

    </div>
  </body>
</html>
## Options

### omit

Type: `Array`

Defaults: `[]`

Returns: `Object`

Omit properties from the context. Useful if properties are added via options, but should not be on the context.


## config

See [config docs](./config.md)
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
{%= _.include("docs-changelog.md") %}
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
Code comments may be used in markdown templates, and they will be stripped from the rendered README as long as they adhere to the following syntax:

```handlebars
{{!-- foo --}}
{{! foo }}
{{!foo}}
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

* `{%= _.include("file.md") %}`: include a file (or files using [minimatch][minimatch] patterns) from the `./templates/` directory of _the phaser task_.
* `{%= _.doc("file.md") %}`:  include a file (or files using [minimatch][minimatch] patterns) from the `./docs/` directory of _your project_.
* `{%= _.resolve("file.md") %}`: include a **specific file** from *node_modules*`.
* `{%= _.contrib("file.md") %}`: include a file (or files using [minimatch][minimatch] patterns) from the `./contrib/` directory of _the phaser task_. This mixin is for the [Assemble](http://assemble.io).


### _.include()
Use the `include` mixin in templates to pull in content from other files:

```js
{%= _.include("examples.md") %}
```

[Minimatch][minimatch] patterns may also be used:

```js
{%= _.include("docs-*.md") %}
```

Unless overridden in the `templates` option, the `include` mixin will use the `./node_modules/phaser/tasks/templates/` directory (from the root of your project) as the `cwd` for templates.


### _.doc()
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

Override the default directory for files included using `{%= _.doc('foo.md') %}`. This defaults to the `./docs` directory in the root of your project.

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

Override the default `cwd` for files included by using `{%= _.include('foo.md') %}`. By default, the `include` mixin will look for files in `./node_modules/phaser/tasks/templates` directory, where some starter templates are stored. ([Also see examples →](./DOCS.md#examples))

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

* `{%= _.include("docs-*.md", "***") %}` (more below...)
* `{%= _.doc("*.md", "\n***\n") %}` (more below...)

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

```bash
npm install phaser --save-dev
```