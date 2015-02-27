# verb [![NPM version](https://badge.fury.io/js/verb.svg)](http://badge.fury.io/js/verb)  [![Build Status](https://travis-ci.org/assemble/verb.svg)](https://travis-ci.org/assemble/verb) 

> Verb makes it dead simple to generate markdown documentation, using simple templates, with zero configuration required. A project without documentation is like a project that doesn't exist.

**Heads up!**

As of v0.4.0, Verb now requires [verb-cli] to run. See the [getting started](#getting-started) section for details.

**Features**

- Build API docs from code comments (this couldn't be easier!)
- Add a [.verb.md](#verbmd) markdown template to your project, and verb will build your readme using data from package.json.
- If you need more, create a [verbfile.js](#verbfile.js)! Verb can complex documentation too, including multi-page TOCs, cross-reference links, auto-generated links to dependencies and so on.
- Verb can run any [gulp](https://github.com/gulpjs/gulp) plugin
- Verb is built on top of [Template](https://github.com/jonschlinkert/template). All of Template's methods are exposed on the API.
- You can get by with a simple `.verb.md` markdown template, or do things like add layouts, pages, partials, helpers, register a template engine, load data or use a `.transform()` or two to modify that data at runtime.


## Install verb-cli

As of v0.4.0, Verb requires verb-cli to run. To install verb-cli, run:

```bash
npm i -g verb-cli
```

## .verb.md

Add a `.verb.md.` [template]() to your project and run `verb` from the command line to generate the project's readme using data from package.json.

If you need more, use a [verbfile.js]().

**Example .verb.md**

This is a basic readme template that Verb's maintainers like to use.

```markdown
# {%= name %} {%= badge("fury") %}

> {%= description %}

## Install
{%= include("install") %}

## API
{%= apidocs("index.js") %}

## Author
{%= include("author") %}

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}
```

`.verb.md` files are rendered using data from `package.json`, but Verb is not restricted to package.json. You can use any data you want, with any templates, helpers, etc.


## verbfile.js

For projects that need more than readme documentation, you can add a `verbfile.js` to the project, and be sure to install verb locally with:

```bash
npm i verb --save-dev
```

**Example basic verbfile.js**

```js
var verb = require('verb');

// load data for templates if needed
verb.data('foo/*.json');

verb.task('default', function() {
  verb.src(['.verb.md', 'docs/*.md'])
    .pipe(verb.dest('./'));
});
```


***

# Template API

> See [Template](https://github.com/jonschlinkert/template) for all available methods.

### .data

> Load data to pass to templates.

Any of these work:

```js
verb.data({foo: 'bar'});
verb.data('package.json');
verb.data(['foo/*.{json,yml}']);
```

### .helper

> Add helpers to be used in templates.

```js
verb.helper('read', function(filepath) {
  return fs.readFileSync(filepath, 'utf8');
});

//=> {%= read("foo.txt") %}
```

### .partial

> Add partials to be used in other templates.

```js
verb.partial('notice', { content: '<strong>...</strong>' });
verb.partial('banner', { content: '/*! Copyright (c) 2014 Jon Schlinkert, Brian Woodward... */' });
// or load a glob of partials
verb.partials('partials/*.md');

// optionally pass locals, all template types support this
verb.partials('partials/*.md', {site: {title: 'Code Project'}});
```

**Usage**

Use the `partial` helper to inject into other templates:

```js
{%= partial("banner") %}
```

Get a cached partial:

```js
var banner = verb.cache.partials['banner'];
```

### .page

> Add pages that might be rendered (really, any template is renderable, pages fit the part though)

```js
verb.page('toc.md', { content: 'Table of Contents...'});
// or load a glob of pages
verb.pages('pages/*.md', {site: {title: 'Code Project'}});
```

Use the `page` helper to inject pages into other templates:

```js
{%= page("toc") %}
```

Get a cached page:

```js
var toc = verb.cache.pages['toc'];
```

Pages are `renderable` templates, so they also have a `.render()` method:

```js
var toc = verb.cache.pages['toc'];
// async
toc.render({}, function(err, content) {
  console.log(content);
});

// or sync
var res = toc.render();
```

**Params**

 - `locals` **{Object}**: Optionally pass locals as the first arg
 - `callback` **{Function}**: If a callback is passed, the template will be rendered async, otherwise sync.


### .layout

> Add layouts, which are used to "wrap" other templates:

```js
verb.layout('default', {content: [
  '<!DOCTYPE html>',
  '  <html lang="en">',
  '  <head>',
  '    <meta charset="UTF-8">',
  '    <title>{%= title %}</title>',
  '  </head>',
  '  <body>',
  '    <<% body %>>', // `body` is the insertion point for another template
  '  </body>',
  '</html>'
].join('\n')});

// or load a glob of layouts
verb.layouts('layouts/*.md', {site: {title: 'Code Project'}});
```

Layouts may be use with any other template, including other layouts. Any level of nesting is also possible.

**Body tags**

Layouts use a `body` as the insertion point for other templates. The syntax verb uses for the `body` tag is:

```js
<<% body %>>
```

Admittedly, it's a strange syntax, but that's why we're using it. Verb shouldn't collide with templates that you might be using in your documentation.


**Usage**

Layouts can be defined in template locals:

```js
// either of these work (one object or two)
verb.page('toc.md', { content: 'Table of Contents...'}, { layout: 'default' });
verb.partial('foo.md', { content: 'partial stuff', layout: 'block' });
```

Or in the front matter of a template. For example, here is how another layout would use our layout example from earlier:

```js
// using this 'inline' template format to make it easy to see what's happening
// this could be loaded from a file too
verb.layout('sidebar', {content: [
  '---',
  'layout: default',
  '---',
  '<div>',
  ' <<% body %>>',
  '</div>'
].join('\n')});
```

# Task API

```js
console.log(verb.env.name);
//=> 'my-project'
```

### [.hasData](./index.js#L519)

Return true if property `key` exists on `verb.cache.data`.

* `key` **{String}**: The property to lookup.    

```js
verb.hasData('foo');
```

### [.src](./index.js#L577)

Glob patterns or filepaths to source files.

* `glob` **{String|Array}**: Glob patterns or file paths to source files.    
* `options` **{Object}**: Options or locals to merge into the context and/or pass to `src` plugins    

```js
verb.src('src/*.hbs', {layout: 'default'})
```

**Example usage**

```js
verb.task('site', function() {
  verb.src('src/*.hbs', {layout: 'default'})
    verb.dest('dist')
});
```

### [.dest](./index.js#L605)

Specify a destination for processed files.

* `dest` **{String|Function}**: File path or rename function.    
* `options` **{Object}**: Options or locals to merge into the context and/or pass to `dest` plugins    

```js
verb.dest('dist', {ext: '.xml'})
```

**Example usage**

```js
verb.task('sitemap', function() {
  verb.src('src/*.txt')
    verb.dest('dist', {ext: '.xml'})
});
```

### [.task](./index.js#L645)

Define a Verb task.

* `name` **{String}**    
* `fn` **{Function}**    

```js
verb.task('docs', function() {
  verb.src(['.verb.md', 'docs/*.md'])
    .pipe(verb.dest('./'));
});
```

### [.watch](./index.js#L661)

Re-run the specified task(s) when a file changes.

* `glob` **{String|Array}**: Filepaths or glob patterns.    
* `fn` **{Function}**: Task(s) to watch.    

```js
verb.task('watch', function() {
  verb.watch('docs/*.md', ['docs']);
});
```



## Why Verb instead of X?

I created Verb to help me maintain my own projects. Any time that is spent maintaining a project that could be automated instead, is time that is being taken away from real productivity.

**Verb does exactly what I needed**

To that end, I wanted a documentation generator that would work in the following scenarios:

- **simple, no config**: most projects don't need complicated docs. e.g. "just build the readme and don't ask me questions."
- **handle the boilerplate stuff**: APIs change from project to project, but my name doesn't, my github URL doesn't, and my choice of licence doesn't. Verb should know those things.
- **don't ask me questions**: I just want to run `verb`, and it should work. No setup or config. There is more than enough data in package.json to handle the boilerplate part of a readme.
- **generate API docs**: When I want [API docs](#api-docs), I should have to jump through hoops, or add `.json` files to directories. I should be able to add the docs wherever I want, to the README, separate docs, or use templates to generate a gh-pages site.
- **render markdown, not HTML**: this one was important to me. There are hundreds of [great libs](https://github.com/jonschlinkert/remarkable) that can render markdown to HTML. Once you have well-formatted markdown documentation, it's easy to convert to HTML.


## Running tests

Install dev dependencies:

```bash
npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/assemble/verb/issues)

## Author

**Jon Schlinkert**
 
+ [github/assemble](https://github.com/assemble)
+ [twitter/assemble](http://twitter.com/assemble) 

## License
Copyright (c) 2014-2015 Jon Schlinkert  
Copyright (c) 2014 Fractal <contact@wearefractal.com>
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on February 27, 2015._

[verb-cli]: https://github.com/verbose/verb-cli
<!-- deps:remote-origin-url jshint-stylish lodash swig git-branch parse-git-config -->
