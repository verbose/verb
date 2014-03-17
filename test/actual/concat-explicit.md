# verb [![NPM version](https://badge.fury.io/js/verb.png)](http://badge.fury.io/js/verb)  [![Build Status](https://travis-ci.org/assemble/verb.png)](https://travis-ci.org/assemble/verb) 

> Verb makes it easy to build project documentation using simple markdown templates, with zero configuration required.

Wondering what happened to Phaser? [Get the story](#renamed-from-verb).

<!-- toc -->
* [Install](#install)
* [About](#about)
  * [How does Verb work?](#how-does-verb-work)
  * [Why use Verb?](#why-use-verb)
  * [Ease of Use](#ease-of-use)
  * [API](#api)
* [Features](#features)
  * [FAQ](#faq)
* [Tests](#tests)
* [Renamed from Phaser](#renamed-from-phaser)
* [Authors](#authors)
* [License](#license)

<!-- toc stop -->
## Install
#### Install with [npm](npmjs.org)

```bash
npm i -g verb --save-dev
```

Now that verb is installed, add `README.tmpl.md` to the `docs/` dir in your project (this is all customizable, but let's keep it simple here), and add this to the file:

```markdown
# {%= name %}

> {%= description %}

## Getting started
Install with [npm](npmjs.org) `npm i -g {%= name %} --save-dev`

## Options
{%= docs("options") %}

## Examples
{%= docs("examples") %}

## Author
+ {%= author.name %}

## License
{%= copyright() %}
{%= license() %}
```

Next, run:

```bash
verb
```

That wasn't so hard, was it? (It was? [Try downloading Verb instead](https://github.com/assemble/verb/archive/master.zip))
Please [report any bugs or feature requests](https://github.com/assemble/verb/issues/new), thanks!

## About
### How does Verb work?

Upon running the `docs` command, unless instructed to do otherwise Verb will attempt to build any markdown templates found in the `docs/` directory of your project, using the data from project's package.json as context.

For many users, Verb might only be used to [build the readme](#TODO: link to readme example) for projects, so that project metadata such as version, date, changelog and so on, are always current and consistent. See the [Verb generator](https://github.com/jonschlinkert/generator-docs) for examples.

**Beyond the basics**

For users who want more than the basics, Verb is also highly configurable via options and offers an [extensive API](#TODO: add link to API docs) for developers who want to add functionality in the form of plugins, middleware, custom tags, filters and so on.

### Why use Verb?

We all know that documenation can be one of the most challenging and time-consuming aspects of maintaining a project. Even for small projects, simply writing and organizing the content on a readme can take more time than it did to create the library itself.

> Verb dramatically reduces the time and effort involved in maintaining markdown docs for code projects through the use of powerful utilities and tools, well-defined conventions, and sensible defaults that are specifically tuned to maintaining projects on GitHub.

For starters, this is accomplished by:

1. Using templates for any sections or text than can be generaralize, such as _badges_, _license_, _copyright_, _author_, _Table of Contents_ and so on.
1. Allowing includes (partials) to be used, so that longer documents can be easily organized and broken down into logical topics or groupings.
1. Pulling in data from package.json to pass as context to any templates. Custom data sources may be used as well.
1. Using boilerplates to kickstart the documentation for new projects. The [Verb generator]() for Yeoman comes with a handful of boilerplates, but it's super easy to create and use your own.

### Ease of Use

> Verb loves users

Verb's number one priorty is ease-of use. For new users **zero configuration** is required to get started. Once Verb is installed, simply enter `docs` in command line, and you're off and running.

For more experienced users, Verb offers _more than 50 template tags and filters, includes and partial caching, comment parsing, YAML Front Matter (or Coffee Front Matter!), plugins, mixins, tons of helpful JavaScript and Node.js utilites_, and lots more.

### API

> Verb also loves developers

Verb has an extensive API and tools for building plugins, custom tags and filters, or extending Verb in other ways.

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

### FAQ

* **Why does Verb use the `{%= foo %}` syntax for templates?**: We do this to avoid collision with the more common, default syntax for Lo-Dash templates, `<%= foo %>`. Of course, nothing if foolproof, so if the default delimiters don't work for your needs you can customize them in the options.

## Tests
Run the tests with:

```
mocha -R spec
```

## Renamed from Phaser


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

_This file was generated by [Verb](https://github.com/assemble/verb) on March 14, 2014._
## How does Verb work?

Upon running the `docs` command, unless instructed to do otherwise Verb will attempt to build any markdown templates found in the `docs/` directory of your project, using the data from project's package.json as context.

For many users, Verb might only be used to [build the readme](#TODO: link to readme example) for projects, so that project metadata such as version, date, changelog and so on, are always current and consistent. See the [Verb generator](https://github.com/jonschlinkert/generator-docs) for examples.

**Beyond the basics**

For users who want more than the basics, Verb is also highly configurable via options and offers an [extensive API](#TODO: add link to API docs) for developers who want to add functionality in the form of plugins, middleware, custom tags, filters and so on.

## Why use Verb?

We all know that documenation can be one of the most challenging and time-consuming aspects of maintaining a project. Even for small projects, simply writing and organizing the content on a readme can take more time than it did to create the library itself.

> Verb dramatically reduces the time and effort involved in maintaining markdown docs for code projects through the use of powerful utilities and tools, well-defined conventions, and sensible defaults that are specifically tuned to maintaining projects on GitHub.

For starters, this is accomplished by:

1. Using templates for any sections or text than can be generaralize, such as _badges_, _license_, _copyright_, _author_, _Table of Contents_ and so on.
1. Allowing includes (partials) to be used, so that longer documents can be easily organized and broken down into logical topics or groupings.
1. Pulling in data from package.json to pass as context to any templates. Custom data sources may be used as well.
1. Using boilerplates to kickstart the documentation for new projects. The [Verb generator]() for Yeoman comes with a handful of boilerplates, but it's super easy to create and use your own.

## Ease of Use

> Verb loves users

Verb's number one priorty is ease-of use. For new users **zero configuration** is required to get started. Once Verb is installed, simply enter `docs` in command line, and you're off and running.

For more experienced users, Verb offers _more than 50 template tags and filters, includes and partial caching, comment parsing, YAML Front Matter (or Coffee Front Matter!), plugins, mixins, tons of helpful JavaScript and Node.js utilites_, and lots more.

## API

> Verb also loves developers

Verb has an extensive API and tools for building plugins, custom tags and filters, or extending Verb in other ways.

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

## FAQ

* **Why does Verb use the `{%= foo %}` syntax for templates?**: We do this to avoid collision with the more common, default syntax for Lo-Dash templates, `<%= foo %>`. Of course, nothing if foolproof, so if the default delimiters don't work for your needs you can customize them in the options.
## API

### base
Type: `undefined`

Default: `undefined`

### copy
Type: `undefined`

Default: `undefined`

### cwd
Type: `undefined`

Default: `undefined`

### exclusions
Type: `undefined`

Default: `undefined`

### expandMapping
Type: `undefined`

Default: `undefined`

### init
Type: `undefined`

Default: `undefined`

### log
Type: `undefined`

Default: `undefined`

### process
Type: `undefined`

Default: `undefined`

### read
Type: `undefined`

Default: `undefined`

### template
Type: `undefined`

Default: `undefined`


## How does Verb differ from Assemble?

Verb was specifically created to make it easier to manage documentation for GitHub projects. In a nutshell:

* Use [Assemble][] to build components, sites, blogs and other projects where HTML is the end result.
* Use Verb to generate and maintain markdown documentation for your [Assemble][] (or non-Assemble) projects.

### Comparison

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

##### <sup>1</sup> Depends on the template engine.

[Assemble]: https://github.com/assemble/assemble
[gray-matter]: https://github.com/assemble/gray-matter
# {%= name %}

> {%= description %}

## Getting started
Install with [npm](npmjs.org) `npm i -g {%= name %} --save-dev`

## Options
{%= docs("options") %}

## Examples
{%= docs("examples") %}

## Author
+ {%= author.name %}

## License
{%= copyright() %}
{%= license() %}
### Install with [npm](npmjs.org)

```bash
npm i -g verb --save-dev
```

Now that verb is installed, add `README.tmpl.md` to the `docs/` dir in your project (this is all customizable, but let's keep it simple here), and add this to the file:

```markdown
# {%= name %}

> {%= description %}

## Getting started
Install with [npm](npmjs.org) `npm i -g {%= name %} --save-dev`

## Options
{%= docs("options") %}

## Examples
{%= docs("examples") %}

## Author
+ {%= author.name %}

## License
{%= copyright() %}
{%= license() %}
```

Next, run:

```bash
verb
```

That wasn't so hard, was it? (It was? [Try downloading Verb instead](https://github.com/assemble/verb/archive/master.zip))
You may be wondering, "Wasn't this project named 'Phaser' before?". Indeed, this is true.

You may also be wondering, "Did you change the name of this project to Verb because you only researched NPM before choosing the name Phaser, and then only after publishing the project on GitHub and promoting it on a popular podcast did you realize that a (also very popular) JavaScript project with the same name already existed on GitHub?"...

Whaaat? No, that's absurd. Only an idiot would do something that like. I don't even know where you heard that. Where did you hear that?

Anyway, the _real_ reason I changed the name to Verb is that Phaser wasn't nerdy enough and I wanted the name to be more familiar and easier to remember. Besides, Phasers shoot lame neon light at people, but Verb is the matter from which starships are made. Period. The other stuff you heard is lies spread by my enemies.

But this is all behind us now, so let's move on, shall we?
Run the tests with:

```
mocha -R spec
```
# Introduction to verb

> Verb makes it easy to build project documentation using simple markdown templates, with zero configuration required.




This project's goal is simple:

* Anything that can be generalized should be. Re-writing sections such as _license_, _copyright_, _author_ every time you create a new project is a big time sink.

Verb takes some of the burden out of this process by

* _templatizing_ certain elements of your documentation.
*




For example:

```markdown
## {%= name %}

> {%= description %}

### Getting started
Install with [npm](npmjs.org) `npm i -g {%= name %} --save-dev`

### Options
{%= docs("options") %}

### Examples
{%= docs("examples") %}

### Author
+ {%= author.name %}

### License
{%= copyright() %}
{%= license() %}
```



Add some markdown files to the `./docs` directory of your project and run `verb` to [generate your documentation](#core-concepts).



_(TODO: add screen shots showing how the `docs` folder is used by the `{%= docs() %}` tag, and how includes come from node modules, etc)_

Examples:

* Add a


## Why use Verb?

* It's dead simple
* Configuration is optional, but not necessary
* Sensible defaults
* Super fast

_Zero configuration is required, but Verb has a robust [API](#TODO) and is highly configurable via options._


## Getting Started

Verb uses your project's package.json to supply data to markdown templates.

### Core Concepts

#### The Basics

* Templates: `README.tmpl.md`
* Includes: `about.md`
* Data: `package.json`

#### Advanced

* Tags
* Filters
* Mixins
* Data: Custom data sources


## Templates

## Includes

## Data

## Extending verb

_TODO_

* Plugins
* Helpers
* API


## Options

### Custom delimiters

You can customize delimiters to be anything you want, but make sure you choose your delimiter syntax wisely to avoid collision with code that is used in examples and so on. Also keep in mind that you'll be breaking compatibility with Verb's boilerplates, curated templates and probably templates hosted by other community members as well.

Enable custom delimiters with the `delims` option:

```js
options: {
  delims: ['<<', '}}']
}
```

Verb uses the [delims](https://github.com/jonschlinkert/delims) library to enable custom delimiters, please visit that project to see all available options and documentation.