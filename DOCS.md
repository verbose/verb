# Documentation for verb

<!-- toc -->
* [Install](#install)
* [Config files](#config-files)
  * [.verbrc.md](#verbrcmd)
* [Features](#features)
* [Options](#options)
  * [metadata](#metadata)
  * [variable](#variable)
  * [namespace](#namespace)
  * [omit](#omit)
  * [ext](#ext)
* [Tags](#tags)
  * [Built-in tags](#built-in-tags)
  * [Experimental tags](#experimental-tags)
  * [Single page: code comment](#single-page-code-comment)
  * [Single page: `toc()` tag](#single-page-toc-tag)
  * [Multiple pages: `toc()` tag](#multiple-pages-toc-tag)
* [Front matter](#front-matter)
  * [Valid Languages](#valid-languages)
* [API](#api)
* [verb.runner](#verbrunner)
* [FAQ](#faq)
* [Comparison to Assemble](#comparison-to-assemble)
  * [How does Verb differ from Assemble?](#how-does-verb-differ-from-assemble)

<!-- toc stop -->
## Install
Install with [npm](npmjs.org):

```bash
npm i verb --save-dev
```

## Config files
For the needs of most projects, Verb won't require any configuration. The documentation, templates and data from packcage.json will be enough.

However, if you want to change how Verb builds documentation for your project there are a couple of options:

* `.verbrc.yml`: a YAML file used for basic settings, file paths, options, register plugins or custom tags, and other "non-dynamic" configuration.
* `verbfile.js`: a verbfile is similar in concept to a gruntfile or gulpfile, but entirely focused on your project's documentation so its much more limited in scope (not to mention [grunt-verb](https://github.com/assemble/grunt-verb) and [gulp-verb](https://github.com/assemble/gulp-verb) can run verbfiles!). Verbfiles are useful for configuring plugins, custom tags, custom source and dest paths, and so on. You can access the [Verb API](#api) with a verfile, or extend Verb with any custom programming you want.

We'll be adding more documentation on these files and how to use them. Please [let us know if you have questions](https://github.com/assemble/verb.git)!


### .verbrc.md

1. Look for a `.verbrc.md` file in the root of the project. This is Verb's signature "markdown config" file, which can include both markdown content and YAML front matter for configuration.

_There are more ways to

## Features
Some of the things Verb has to offer:

* Lo-Dash templates
* Built-in and cust mixins can be used in templates
* The full power of JavaScript
* > 25 Tags and filters
* Uses [gray-matter][gray-matter] to support front matter formatted as YAML Coffee-Script, JSON or TOML.
* Easily add a **Table of Contents** to any file
* Generate a **multi-file Table of Contents**, along with relative links to each file AND section
* Comment parsing (basic)
* Extensive API
* Logging _in your templates!!!_. You can add `{%= log('FOO!') %}` to help with debugging templates.
* Lots more!

[gray-matter]: https://github.com/assemble/gray-matter

## Options
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

When `namespace` defined, an object is created for each data file, where the top level property on the object is the name of the file itself, and the data contained within the file is extended into that object.

<!-- [See examples](#namespacing). -->

### omit

Omit properties from the context.

Type: `Array`

Default: `[]`

Returns: `Object`

Useful if properties are added via options, but should not be on the context.

### ext

Type: `String`

Default: `.md`

The file extension to use for all includes. In other words, `{%= docs() %}`, `{%= include() %}`, `{%= raw() %}`, etc. all expect source files to have a `.md` extension.

## Tags
> Built-in tags provided by Verb

Verb "tags" are just Lo-Dash templates, which means you have the power of straight JavaScript in your templates.

Verb offers a number of specialized tags that were created to address common needs, but it's easy to [add your own custom tags](#custom-tags) too.

### Built-in tags

The following tags can be used in templates out-of-the-box:

#### badge

Example:

```js
{%= badge() %}
```

#### changelog

```
changelog()
```

Automatically use data from a valid, YAML-formatted [CHANGELOG](./CHANGELOG) file in the root of a project to generate a markdown changelog.

Usage:

```js
{%= changelog() %}
```

Results in:

```
## Release History

**DATE**       **VERSION**   **CHANGES**
* 2014-03-10   v0.1.0        First commmit.
```

**Features**

* Columns are formatted using [columnify](https://github.com/timoxley/columnify)
* Dates are parsed by [moment.js](momentjs.com/docs/)


**Custom data source**

Optionally pass in the filepath of a different JSON or YAML data file to use:

```js
{%= changelog("history.yml") %}
```

**Example data**

In [CHANGELOG](./CHANGELOG), or if you supply a custom data source, please use the following conventions:

YAML format:

```yaml
v0.1.0:
  date: 2014-03-11
  changes:
    - First commmit.
```

JSON format:

```json
{
  "v0.1.0": {
    "date": "2014-03-11",
    "changes": [
      "First commmit."
    ]
  }
}
```

#### contrib

```
contrib( filepath )
```

Used by the Assemble core team, includes a template from [verb-contrib-templates](https://github.com/assemble/verb-contrib-templates).

Usage:

```js
{%= contrib('authors') %}
```

Results in:

```bash
**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/jonschlinkert)
```

#### copyright

```
copyright()
```

Return a copyright statement, automatically populated with data from package.json.

Usage:

```js
{%= copyright() %}
```

Results in:

```
Copyright (c) 2014 Jon Schlinkert, contributors.
```

**Start year**

Optionally pass in the start year of your project.

Type: `string`

Default: `undefined`

Example:

```js
{%= copyright('2010') %}
```

Results in:

```
Copyright (c) 2010-2014 Jon Schlinkert, contributors.
```

#### date

```
date( format )
```

Format a date using [moment.js](momentjs.com/docs/)

Usage:

```js
{%= date('YYYY-MM-DD') %}
```

Returns

<!-- don't escape this template! -->

```js
2014-06-01
```

Consult the [moment.js documentation](momentjs.com/docs/) for the full list of available options.

#### docs

```
docs( filepath, options )
```

**filepath**

The path to the file you want to include in the `docs/` directory

**Options**

* `docs`: the directory to search when using the `{%= docs() %}` tag.
* `ext`: the file extension to use. Default `.md`.

**Usage**

```js
{%= docs('install') %}
```

Adds the contents of `docs/install.md`, which might look like:

<pre>
Install globally with [npm](npmjs.org):

```bash
npm i  {%= name %} --save-dev
```
</pre>

[Resulting in this](./README.md/#install).


#### getAuthors

```
getAuthors()
```

_(TODO)_

Example:

```js
{%= getAuthors() %}
```

#### html

```
html( filepath )
```

_(TODO)_

Example:

```js
{%= html() %}
```

#### include

```
include( filepath, options )
```

Include a _generic_ template from [verb-readme-includes](https://github.com/assemble/verb-readme-includes). The `include` tag is great for allowing docs to be reused across multiple projects, or just to organize.

Usage:

```js
{%= include('footer.md') %}
```
Results in:

```
_This file was generated by [verb](https://github.com/assemble/verb) on March 22, 2014._
```
_(Note that the name and url can be automatically updated by the [current runner](#verb-runner))._

#### license

```
license()
```

Return a "license" statement, populated with data from package.json.

Usage:

```js
{%= license() %}
```

Returns:

```
Released under the MIT license
```

#### log

```
log( string )
```

_(TODO)_

Usage:

```js
{%= log() %}
```

#### methods

```
methods( filepath, options )
```

Params:

* `filepath` (required). default: `undefined`

Uses [list-methods](https://github.com/jonschlinkert/list-methods) to list the property names of all enumerable properties, own and inherited, of objects that have function values.
In other words, this tag can help kickstart your API documentation!

Usage:

```js
{%= methods('foo.js') %}
```

Results in:

```yaml
## foo
Type: `undefined`

Default: `undefined`

## bar
Type: `undefined`

Default: `undefined`

## baz
Type: `undefined`

Default: `undefined`
```

Specify a template to use.

```js
{%= methods('foo.js', {template: 'yaml'}) %}
```

Visit [list-methods](https://github.com/jonschlinkert/list-methods) to see all available options.

#### moment

```
moment()
```

_(TODO)_

Usage:

```js
{%= moment() %}
```

#### raw

```
raw( filepath )
```

_(TODO)_

Params:

* `filepath` (required)

Usage:

```js
{%= raw() %}
```

#### toc

```
toc( filepath )
```

Params:

* `filepath` (optional): the file path or globbing patterns for the files that you want to generate a TOC for.

If left undefined, a table of contents is generated for the current page.

Usage:

```js
# Table of Contents

{%= toc() %}
```

Results in something like:

```
# Table of Contents

* [Install](#install)
* [Customize](#customize)
* [Test](#test)
* [Contribute](#contribute)
* [Author](#author)
* [License](#license)
```

Also see [Generating a TOC](#generating-a-toc).

### Experimental tags

These tags can be used, but they require more testing in different scenarios before they can be considered stable:


#### comments

```
comments( filepath )
```

_(TODO)_

Usage:

```js
{%= comments('foo/*.js') %}
```

#### authors

Parses the `AUTHORS` file in the root of a project and returns an array of authors.

Usage:

```js
{%= authors() %}
```
Results in:

```js
[
  {
    name: 'Jon Schlinkert'
    email: '',
    url: 'https://github.com/jonschlinkert'
  },
  {
    name: 'Brian Woodward'
    email: '',
    url: 'https://github.com/doowb'
  }
]
```

#### Custom tags

Verb "tags" are just JavaScript functions processed by lodash.template. So you have the power of straight JavaScript in your templates, with the ease-of-use and metadata supplied by Verb. This example shows how easy it is to create a custom tag for Verb.

```js
module.exports = function(verb) {
  var tags = {};

  /**
   * Retrieve a value from the specified json file
   * Usage: {%= foo('name') %}
   */

  tags.foo = function(val) {
    var data = verb.file.readJSONSync('foo.json');
    return data[val];
  };
  return tags;
};
```

Given that `foo.json` has:

```json
{
  "name": "Bar"
}
```
we would use it like this:

```js
{%= foo('name') %}
```

resulting in:

```
Bar
```

## Generating a TOC
> A few different options are available for creating a Table of Contents with Verb.

### Single page: code comment

Use the following syntax wherever you want the TOC:

```
<!-- toc -->
```

* Current page only
* Generate the TOC after everything is rendered.
* Any page with the `<!-- toc -->` code comment will include every section on the final rendered page.
* Leaves code comments behind marking the beginning and end of the TOC, but they won't be visible to viewers.


### Single page: `toc()` tag

Use the following syntax wherever you want the TOC:

```
{%= toc() %}
```

* When no arguments are passed a TOC is generated for the current page only
* Builds the TOC on-the-fly as each page is rendered.
* Unlike code comments, this doesn't "leave anything behind" after the build.
* But, it _does not recurse into includes_, so only the _current, top-level page_ will be used to generate the TOC.

### Multiple pages: `toc()` tag

Use the following syntax wherever you want the TOC:

```
{%= toc("*.md") %}
```

* Multiple pages
* Same syntax as `{%= toc() %}` but with a filepath or globbing patterns defined.
* Generates a complete table of contents that includes every section of every page defined
* Each section of the generated TOC begins with a heading that is created from the name of each file
* Adds relative links to each file
* Adds relative links to each section of each file.


### TOC Options

Verb uses [marked-toc](https://github.com/jonschlinkert/marked-toc) for generating tables of contents. Only options that have been changed from the marked-toc defaults are listed here. _Please visit [marked-toc](https://github.com/jonschlinkert/marked-toc) for additional documentation and to see the complist list of available options.

#### maxDepth

Type: `number`

Default: `2`

The number of levels of list items to generate.

## Front matter
> Verb will make any data from valid front matter available to your templates

### Valid Languages

Verb uses [gray-matter](https://github.com/assemble/gray-matter) for parsing front matter, so any format allowed by that library should work, including:

* JSON
* YAML
* TOML
* Coffee-script

Please see the [gray-matter](https://github.com/assemble/gray-matter) project for documentation and to see all available options.


#### Coffee

**Example**

Pass data to be used for generating [dotfiles](./docs/dotfiles.md):

```coffee
---coffee
options =
  dotfiles: require './dotfiles.json'
---
```


## API
_(TODO)_

#### base
Type: `undefined`

Default: `undefined`

#### copy
Type: `undefined`

Default: `undefined`

#### cwd
Type: `undefined`

Default: `undefined`

#### exclusions
Type: `undefined`

Default: `undefined`

#### log
Type: `undefined`

Default: `undefined`

#### process
Type: `undefined`

Default: `undefined`

#### read
Type: `undefined`

Default: `undefined`

#### template
Type: `undefined`

Default: `undefined`



## verb.runner
Update Verb's `runner` metadata with info about the tool currently running Verb, such as [grunt-verb][grunt], [gulp-verb][gulp], [verb-cli][cli], or a custom runner.

Verb exposes certain runner metadata such as `runner.name` and `runner.url` so that it can be used in templates.

Usage:

```js
var verb = require('verb');
verb.runner = {
  name: 'Verb',
  url: 'https://github.com/assemble/verb'
};
```

used with this template

```markdown
_This file was generated by [{%= runner.name %}]({%= runner.url %}) on {%= date() %}._
```

would render to:

```markdown
_This file was generated by [verb](https://github.com/assemble/verb) on 4/16/2014._
```

e.g.

_This file was generated by [verb](https://github.com/assemble/verb) on 4/16/2014._


[cli]: https://github.com/assemble/verb-cli "verb-cli: the command line interface for Verb."
[grunt]: https://github.com/assemble/grunt-verb "grunt-verb: the Grunt plugin for Verb."
[gulp]: https://github.com/assemble/gulp-verb "gulp-verb: the gulp plugin for Verb."

## FAQ
> General stuff about Verb that didn't quite fit in other categories

* When Lo-dash templates shouldn't be evaluated they be escaped by using square brackets, `{%= foo %}`, (like for code examples). Verb converts these to the actual delimiters in the result.
* Verb's goal is to _simply work_ without custom programming, but you can fully extend Verb's core with plugins, add custom tags, or use a Verbfile for advanced configuration needs.
* **Why does Verb use the `{%= foo %}` syntax for templates?**: We do this to avoid collision with the more common, default syntax for Lo-Dash templates, `<%= foo %>`. Of course, nothing if foolproof, so if the default delimiters don't work for your needs you can customize them in the options.

## Comparison to Assemble
### How does Verb differ from Assemble?

Verb was specifically created to make it easier to manage documentation for GitHub projects. In a nutshell:

* Use Verb to generate and maintain markdown documentation for your [Assemble][] (or non-Assemble) projects.
* Use [Assemble][] to generate a website from your Verb docs! Assemble is great for building components, sites, blogs and other projects where HTML is the end result.

#### Comparison

While both engines can be extended to accomplish most of the following features, this table describes what you should expect from each _out-of-the-box_:

**Feature** | **[Assemble][]** | **Verb**
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

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on June 01, 2014._