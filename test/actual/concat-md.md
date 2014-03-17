# BASIC

> Verb makes it easy to build project documentation using simple markdown templates, with zero configuration required.



## Example "README" template

## BASIC [![NPM version](https://badge.fury.io/js/verb.png)](http://badge.fury.io/js/verb)  [![Build Status](https://travis-ci.org/assemble/verb.png)](https://travis-ci.org/assemble/verb) 

> Verb makes it easy to build project documentation using simple markdown templates, with zero configuration required.

Wondering what happened to Phaser? [Get the story](#renamed-from-verb).

<!-- toc -->
* [Example "README" template](#example-readme-template)
* [BASIC [![NPM version](https://badge.fury.io/js/verb.png)](http://badge.fury.io/js/verb)  [![Build Status](https://travis-ci.org/assemble/verb.png)](https://travis-ci.org/assemble/verb)](#basic-npm-versionhttpsbadgefuryiojsverbpnghttpbadgefuryiojsverb-build-statushttpstravis-ciorgassembleverbpnghttpstravis-ciorgassembleverb)
  * [Install](#install)
  * [About](#about)
  * [Features](#features)
  * [Tests](#tests)
  * [Renamed from Phaser](#renamed-from-phaser)
  * [Authors](#authors)
  * [License](#license)
  * [How does Verb work?](#how-does-verb-work)
  * [Why use Verb?](#why-use-verb)
  * [Ease of Use](#ease-of-use)
  * [API](#api)
* [Features](#features)
  * [FAQ](#faq)
  * [API](#api)
  * [How does Verb differ from Assemble?](#how-does-verb-differ-from-assemble)
* [{%= name %}](#name)
  * [Getting started](#getting-started)
  * [Options](#options)
  * [Examples](#examples)
  * [Author](#author)
  * [License](#license)
* [Introduction to BASIC](#introduction-to-basic)
  * [Why use Verb?](#why-use-verb)
  * [Getting Started](#getting-started)
  * [Templates](#templates)
  * [Includes](#includes)
  * [Data](#data)
  * [Extending BASIC](#extending-basic)
  * [Options](#options)
* [README](#readme)

<!-- toc stop -->
### Install
##### Install with [npm](npmjs.org)

```bash
npm i -g BASIC --save-dev
```

Now that BASIC is installed, add `README.tmpl.md` to the `docs/` dir in your project (this is all customizable, but let's keep it simple here), and add this to the file:

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
BASIC
```

That wasn't so hard, was it? (It was? [Try downloading Verb instead](https://github.com/assemble/verb/archive/master.zip))
Please [report any bugs or feature requests](https://github.com/assemble/verb/issues/new), thanks!

### About
#### How does Verb work?

Upon running the `docs` command, unless instructed to do otherwise Verb will attempt to build any markdown templates found in the `docs/` directory of your project, using the data from project's package.json as context.

For many users, Verb might only be used to [build the readme](#TODO: link to readme example) for projects, so that project metadata such as version, date, changelog and so on, are always current and consistent. See the [Verb generator](https://github.com/jonschlinkert/generator-docs) for examples.

**Beyond the basics**

For users who want more than the basics, Verb is also highly configurable via options and offers an [extensive API](#TODO: add link to API docs) for developers who want to add functionality in the form of plugins, middleware, custom tags, filters and so on.

#### Why use Verb?

We all know that documenation can be one of the most challenging and time-consuming aspects of maintaining a project. Even for small projects, simply writing and organizing the content on a readme can take more time than it did to create the library itself.

> Verb dramatically reduces the time and effort involved in maintaining markdown docs for code projects through the use of powerful utilities and tools, well-defined conventions, and sensible defaults that are specifically tuned to maintaining projects on GitHub.

For starters, this is accomplished by:

1. Using templates for any sections or text than can be generaralize, such as _badges_, _license_, _copyright_, _author_, _Table of Contents_ and so on.
1. Allowing includes (partials) to be used, so that longer documents can be easily organized and broken down into logical topics or groupings.
1. Pulling in data from package.json to pass as context to any templates. Custom data sources may be used as well.
1. Using boilerplates to kickstart the documentation for new projects. The [Verb generator]() for Yeoman comes with a handful of boilerplates, but it's super easy to create and use your own.

#### Ease of Use

> Verb loves users

Verb's number one priorty is ease-of use. For new users **zero configuration** is required to get started. Once Verb is installed, simply enter `docs` in command line, and you're off and running.

For more experienced users, Verb offers _more than 50 template tags and filters, includes and partial caching, comment parsing, YAML Front Matter (or Coffee Front Matter!), plugins, mixins, tons of helpful JavaScript and Node.js utilites_, and lots more.

#### API

> Verb also loves developers

Verb has an extensive API and tools for building plugins, custom tags and filters, or extending Verb in other ways.

### Features

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

#### FAQ

* **Why does Verb use the `{%= foo %}` syntax for templates?**: We do this to avoid collision with the more common, default syntax for Lo-Dash templates, `<%= foo %>`. Of course, nothing if foolproof, so if the default delimiters don't work for your needs you can customize them in the options.

### Tests
Run the tests with:

```
mocha -R spec
```

### Renamed from Phaser


### Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/jonschlinkert)

### License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated by [Verb](https://github.com/assemble/verb) on March 14, 2014._
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
### API

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

#### expandMapping
Type: `undefined`

Default: `undefined`

#### init
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


### How does Verb differ from Assemble?

Verb was specifically created to make it easier to manage documentation for GitHub projects. In a nutshell:

* Use [Assemble][] to build components, sites, blogs and other projects where HTML is the end result.
* Use Verb to generate and maintain markdown documentation for your [Assemble][] (or non-Assemble) projects.

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
#### Install with [npm](npmjs.org)

```bash
npm i -g BASIC --save-dev
```

Now that BASIC is installed, add `README.tmpl.md` to the `docs/` dir in your project (this is all customizable, but let's keep it simple here), and add this to the file:

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
BASIC
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
## Introduction to BASIC

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


### Why use Verb?

* It's dead simple
* Configuration is optional, but not necessary
* Sensible defaults
* Super fast

_Zero configuration is required, but Verb has a robust [API](#TODO) and is highly configurable via options._


### Getting Started

Verb uses your project's package.json to supply data to markdown templates.

#### Core Concepts

##### The Basics

* Templates: `README.tmpl.md`
* Includes: `about.md`
* Data: `package.json`

##### Advanced

* Tags
* Filters
* Mixins
* Data: Custom data sources


### Templates

### Includes

### Data

### Extending BASIC

_TODO_

* Plugins
* Helpers
* API


### Options

#### Custom delimiters

You can customize delimiters to be anything you want, but make sure you choose your delimiter syntax wisely to avoid collision with code that is used in examples and so on. Also keep in mind that you'll be breaking compatibility with Verb's boilerplates, curated templates and probably templates hosted by other community members as well.

Enable custom delimiters with the `delims` option:

```js
options: {
  delims: ['<<', '}}']
}
```

Verb uses the [delims](https://github.com/jonschlinkert/delims) library to enable custom delimiters, please visit that project to see all available options and documentation.
## README

> When you run `docs` in the command line, Verb looks for files with the `.tmpl.md` extension in the `docs/` directory of your project


Generating a readme is as easy as running


<!doctype html>
<html lang="en">
  <head>
    
  </head>
  <body>
    <div class="container bs-docs-container">
      <h1 id="verb-npm-version-https-badge-fury-io-js-verb-png-http-badge-fury-io-js-verb-build-status-https-travis-ci-org-assemble-verb-png-https-travis-ci-org-assemble-verb-">verb <a href="http://badge.fury.io/js/verb"><img src="https://badge.fury.io/js/verb.png" alt="NPM version"></a>  <a href="https://travis-ci.org/assemble/verb"><img src="https://travis-ci.org/assemble/verb.png" alt="Build Status"></a></h1>
<blockquote>
<p>Verb makes it easy to build project documentation using simple markdown templates, with zero configuration required.</p>
</blockquote>
<p>Wondering what happened to Phaser? <a href="#renamed-from-verb">Get the story</a>.</p>
<!-- toc -->

<!-- toc stop -->
<h2 id="install">Install</h2>
<h4 id="install-with-npm-npmjs-org-">Install with <a href="npmjs.org">npm</a></h4>
<pre><code class="lang-bash">npm i -g verb --save-dev
</code></pre>
<p>Now that verb is installed, add <code>README.tmpl.md</code> to the <code>docs/</code> dir in your project (this is all customizable, but let&#39;s keep it simple here), and add this to the file:</p>
<pre><code class="lang-markdown"># {%= name %}

&gt; {%= description %}

### Getting started
Install with [npm](npmjs.org) `npm i -g {%= name %} --save-dev`

### Options
{%= docs(&quot;options&quot;) %}

### Examples
{%= docs(&quot;examples&quot;) %}

### Author
+ {%= author.name %}

### License
{%= copyright() %}
{%= license() %}
</code></pre>
<p>Next, run:</p>
<pre><code class="lang-bash">verb
</code></pre>
<p>That wasn&#39;t so hard, was it? (It was? <a href="https://github.com/assemble/verb/archive/master.zip">Try downloading Verb instead</a>)
Please <a href="https://github.com/assemble/verb/issues/new">report any bugs or feature requests</a>, thanks!</p>
<h2 id="about">About</h2>
<h3 id="how-does-verb-work-">How does Verb work?</h3>
<p>Upon running the <code>docs</code> command, unless instructed to do otherwise Verb will attempt to build any markdown templates found in the <code>docs/</code> directory of your project, using the data from project&#39;s package.json as context.</p>
<p>For many users, Verb might only be used to <a href="#TODO: link to readme example">build the readme</a> for projects, so that project metadata such as version, date, changelog and so on, are always current and consistent. See the <a href="https://github.com/jonschlinkert/generator-docs">Verb generator</a> for examples.</p>
<p><strong>Beyond the basics</strong></p>
<p>For users who want more than the basics, Verb is also highly configurable via options and offers an <a href="#TODO: add link to API docs">extensive API</a> for developers who want to add functionality in the form of plugins, middleware, custom tags, filters and so on.</p>
<h3 id="why-use-verb-">Why use Verb?</h3>
<p>We all know that documenation can be one of the most challenging and time-consuming aspects of maintaining a project. Even for small projects, simply writing and organizing the content on a readme can take more time than it did to create the library itself.</p>
<blockquote>
<p>Verb dramatically reduces the time and effort involved in maintaining markdown docs for code projects through the use of powerful utilities and tools, well-defined conventions, and sensible defaults that are specifically tuned to maintaining projects on GitHub.</p>
</blockquote>
<p>For starters, this is accomplished by:</p>
<ol>
<li>Using templates for any sections or text than can be generaralize, such as <em>badges</em>, <em>license</em>, <em>copyright</em>, <em>author</em>, <em>Table of Contents</em> and so on.</li>
<li>Allowing includes (partials) to be used, so that longer documents can be easily organized and broken down into logical topics or groupings.</li>
<li>Pulling in data from package.json to pass as context to any templates. Custom data sources may be used as well.</li>
<li>Using boilerplates to kickstart the documentation for new projects. The <a href="">Verb generator</a> for Yeoman comes with a handful of boilerplates, but it&#39;s super easy to create and use your own.</li>
</ol>
<h3 id="ease-of-use">Ease of Use</h3>
<blockquote>
<p>Verb loves users</p>
</blockquote>
<p>Verb&#39;s number one priorty is ease-of use. For new users <strong>zero configuration</strong> is required to get started. Once Verb is installed, simply enter <code>docs</code> in command line, and you&#39;re off and running.</p>
<p>For more experienced users, Verb offers <em>more than 50 template tags and filters, includes and partial caching, comment parsing, YAML Front Matter (or Coffee Front Matter!), plugins, mixins, tons of helpful JavaScript and Node.js utilites</em>, and lots more.</p>
<h3 id="api">API</h3>
<blockquote>
<p>Verb also loves developers</p>
</blockquote>
<p>Verb has an extensive API and tools for building plugins, custom tags and filters, or extending Verb in other ways.</p>
<h2 id="features">Features</h2>
<ul>
<li>Lo-Dash templates and mixins</li>
<li>The full power of JavaScript</li>
<li>Filters</li>
<li>Tags</li>
<li>Partial Caching</li>
<li>Mixins</li>
<li>Templates can be used directly, cached as JavaScript, and/or via <code>require</code> statements</li>
<li>Uses [gray-matter][] to support both YAML Front Matter and Coffee Front Matter</li>
<li>Easily add a <strong>Table of Contents</strong> to any file</li>
<li>Generate a <strong>multi-file Table of Contents</strong>, along with relative links to each file AND section</li>
<li>Comment parsing (basic)</li>
<li>Extensive API</li>
<li>File-system Utilities</li>
<li>Logging</li>
<li>Lots more! So much more. Much much more. So much more that you don&#39;t even know how much more it&#39;s so much. I don&#39;t know where to start.</li>
</ul>
<h3 id="faq">FAQ</h3>
<ul>
<li><strong>Why does Verb use the <code>{%= foo %}</code> syntax for templates?</strong>: We do this to avoid collision with the more common, default syntax for Lo-Dash templates, <code>&lt;%= foo %&gt;</code>. Of course, nothing if foolproof, so if the default delimiters don&#39;t work for your needs you can customize them in the options.</li>
</ul>
<h2 id="tests">Tests</h2>
<p>Run the tests with:</p>
<pre><code>mocha -R spec
</code></pre><h2 id="renamed-from-phaser">Renamed from Phaser</h2>
<h2 id="authors">Authors</h2>
<p><strong>Jon Schlinkert</strong></p>
<ul>
<li><a href="https://github.com/jonschlinkert">github/jonschlinkert</a></li>
<li><a href="http://twitter.com/jonschlinkert">twitter/jonschlinkert</a></li>
</ul>
<p><strong>Brian Woodward</strong></p>
<ul>
<li><a href="https://github.com/doowb">github/doowb</a></li>
<li><a href="http://twitter.com/jonschlinkert">twitter/doowb</a></li>
</ul>
<h2 id="license">License</h2>
<p>Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license</p>
<hr>
<p><em>This file was generated by <a href="https://github.com/assemble/verb">Verb</a> on March 14, 2014.</em></p>

    </div>
  </body>
</html>
{{block custom}}
BOOM Verb makes it easy to build project documentation using simple markdown templates, with zero configuration required.
{{/block}}
## Release History

**DATE**       **VERSION**   **CHANGES**   
* 2014-03-10   v0.1.0        First commmit.
# API

> Developer documentation for Verb

## [colors.js](lib/colors.js)

## [config.js](lib/config.js)

Initialize config object. This defaults to
package.json, unless overridden by passing
an object to `options.config`

* `config`: (Object):

## [data.js](lib/data.js)

Extend context with metadata from
`options.data`.

* `options`: (Object):

## [exclusions.js](lib/exclusions.js)

Default exclusions
Omit properties from the context

## [file.js](lib/file.js)

### [expand](lib/file.js#L17)

Expand files.

* `src`: (String):
* `options`: (Object):

### [read](lib/file.js#L41)

Read files.

* `src`: (String):
* `options`: (Object):

Expand mapping

* `expandMapping`: (name):
* `patterns`: (Array

String): Accepts either comma separated globbing patterns or an array of globbing patterns.

* `dest`: (String): The base path for dest files.
* `options`: (Object): Options to pass in: @option {String} cwd: the current working directory for source files. @option {String} ext: the file extension to use on dest files.

## [filters.js](lib/filters.js)

### [filters](lib/filters.js#L15)

Adds filters to the context

* `options`: (Object):

Built-in filters
User-defined

## [columnify.js](lib/filters/columnify.js)

## [listify.js](lib/utils/listify.js)

Flatten an array and convert it
to a comma-separated list.

* `arr`: (Array): [description]

## [reverse.js](lib/utils/reverse.js)

### [reverse](lib/utils/reverse.js#L11)

Reverse a string

* `str`: (String): The string to reverse

## [safename.js](lib/utils/safename.js)

Safename

* `name`: ([type]): The name to be modified

## [shortname.js](lib/filters/shortname.js)

## [strip.js](lib/utils/strip.js)

### [reverse](lib/utils/strip.js#L11)

Strip newlines and whitespace padding.

* `str`: (String): The string to reverse

## [layout.js](lib/scaffolds/layout.js)

## [log.js](lib/tags/log.js)

## [matter.js](lib/matter.js)

Parse and extract YAML, JSON or Coffee
front matter.

## [mixins.js](lib/mixins.js)

### [mixins](lib/mixins.js#L11)

Export mixins

* `options`: (Object):

## [plugins.js](lib/plugins.js)

### [plugins](lib/plugins.js#L17)

Adds plugins to the context

* `options`: (Object):

Run built-in plugins
Run user-defined plugins

## [contributors.js](lib/utils/contributors.js)

## [homepage.js](lib/plugins/homepage.js)

## [repo.js](lib/plugins/repo.js)

## [travis.js](lib/plugins/travis.js)

.travis.yml
If `.travis.yml` does not exist, and
`travis: true` is defined in the options,
then add a `.travis.yml` file to the root
of the project.
If `.travis.yml` already exists, add
a travis URL to the context for use
in templates

## [username.js](lib/utils/username.js)

Extract a username/org from a
GitHub URL.

* `{String}`: ():

## [scaffolds.js](lib/scaffolds.js)

## [comment.js](lib/scaffolds/comment.js)

## [gitignore.js](lib/scaffolds/gitignore.js)

## [html-layout.js](lib/scaffolds/html-layout.js)

## [methods.js](lib/tags/methods.js)

## [readme-basic.js](lib/scaffolds/readme-basic.js)

## [readme-contrib.js](lib/scaffolds/readme-contrib.js)

## [tags.js](lib/tags.js)

### [tags](lib/tags.js#L16)

Adds tags to the context

* `options`: (Object):

Initialize tags

* `verb`: (Object):

Built-in tags
User-defined

## [authors.js](lib/utils/authors.js)

## [badge.js](lib/tags/badge.js)

Status, analytics and version badges.

* `config`: (Object):
* `options`: (Object):

## [changelog.js](lib/tags/changelog.js)

## [comments.js](lib/tags/comments.js)

## [contrib.js](lib/tags/contrib.js)

## [copyright.js](lib/tags/copyright.js)

Add a copyright statement, with author and year(s) in effect.

* `startYear`: (Number): Optional parameter to define the start year of the project.

## [date.js](lib/utils/date.js)

### [formatDate](lib/utils/date.js#L10)

Date functions used in _.date() filter

* `dateobj`: (Object): The date object to format.
* `structure`: (String): The structure to use, e.g. 'YYYY-MM-DD'.

## [dates.js](lib/tags/dates.js)

### [formatDate](lib/tags/dates.js#L11)

Date functions used in _.date() filter

* `dateobj`: (Object): The date object to format.
* `structure`: (String): The structure to use, e.g. 'YYYY-MM-DD'.

## [docs.js](lib/tags/docs.js)

## [getAuthors.js](lib/tags/getAuthors.js)

## [html.js](lib/tags/html.js)

## [include.js](lib/tags/include.js)

## [license.js](lib/tags/license.js)

## [moment.js](lib/tags/moment.js)

## [pkg.js](lib/tags/pkg.js)

## [raw.js](lib/tags/raw.js)

## [toc.js](lib/utils/toc.js)

Generate a Table of Contents.

* `str`: (String):
* `options`: (Object):

## [template.js](lib/template.js)

Compile Lo-Dash templates.

* `str`: (String): The templates to process.
* `data`: (Object): Context for the templates
* `settings`: (Object): Options to pass to Lo-Dash

## [adjust.js](lib/utils/adjust.js)

Adjust heading levels. Adds one heading
level next to all markdown headings to
make them correct within the scope of the
inheriting document. Headings in fenced
code blocks are skipped.
Unescapes delimiters

## [arrayify.js](lib/utils/arrayify.js)

Coerce the value to an array

* `arrayify`: (name):
* `arr`: (Array

String):

## [block.js](lib/utils/block.js)

TODO: This isn't used anywhere.
Move it to example for delims!
Create a block template

## [condense.js](lib/utils/condense.js)

Remove all extraneous newlines.

* `str`: (String):

## [convertUrl.js](lib/utils/convertUrl.js)

## [dir.js](lib/utils/dir.js)

Get the relative path from process.cwd() to
the specifiied paths, from any other directory
in the project.

## [expandData.js](lib/utils/expandData.js)

### [expandData](lib/utils/expandData.js#L19)

Read in data from a string, object or array

* `data`: (String,Object,Array): String, object or array
* `options`: (Object): Pass an object of options

## [extendContext.js](lib/utils/extendContext.js)

## [index.js](lib/utils/index.js)

## [inspect.js](lib/utils/inspect.js)

## [isType.js](lib/utils/isType.js)

Returns the `typeOf` a JavaScript value

## [lookup.js](lib/utils/lookup.js)

Convenience wrapper around `glob.find` and `glob.match`.
Expand the given glob patterns, then look for a match
in the result set.

* `patterns`: (String): The glob patterns to expand.
* `name`: (String): The name to match in the result set.

## [md.js](lib/utils/md.js)

Format markdown, adjusts whitespace.

* `str`: (String):

## [postProcess.js](lib/utils/postProcess.js)

Post-process content with RegExp replacement patterns

* `str`: (String): The string with patterns to replace.
* `options`: (Object): The options to use @option {patterns} Replacement patterns to use

## [rollcall.js](lib/utils/rollcall.js)

## [time.js](lib/utils/time.js)

## function time()

Get the current time using `.toLocaleTimeString()`.

## [timestamp.js](lib/utils/timestamp.js)

### [function timetamp()](lib/utils/timestamp.js#L9)

Get the current time using `.toISOString()`

# verb

> Verb makes it easy to build project documentation using simple markdown templates, with zero configuration required.

Exactly like the one on Star Trek. But instead of "stun" and "kill", this Verb generates markdown documentation, making it hands-down the most deadly markdown documentation generator on the planet (and probably others ones too).

Please [report any bugs or feature requests](https://github.com/assemble/verb/issues/new), thanks!

## Install
<!-- docs('install') -->

## About
<!-- docs('about') -->

## License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated by [Verb](https://github.com/assemble/verb) on March 14, 2014._
## API

> Verb methods

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

### layout
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


## Release History

 * v0.1.0   2014-03-14   First commmit.

## Release History

 * 2014-03-14   v0.1.0   First commmit.