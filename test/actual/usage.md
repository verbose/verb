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