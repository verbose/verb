# verb [![NPM version](https://badge.fury.io/js/verb.svg)](http://badge.fury.io/js/verb)

> Verb makes it dead simple to generate markdown documentation, using simple templates, with zero configuration required. A project without documentation is like a project that doesn't exist.


- In addition to verb's unique features, verb can also run any [gulp](https://github.com/gulpjs/gulp) plugin
- All methods from [Template](https://github.com/jonschlinkert/template) can be used in Verb


## Install
## Install globally with [npm](npmjs.org):

```bash
npm i -g verb
```


## Usage

Run `verb` to build your project's readme from a `.verb.md` file using metadata from package.json, or add a `verbfile.js` to the project if you need more.

**Example .verb.md**

Basic template for generating a readme from metadata in `package.json`:

```markdown
# {%= name %} {%= badge("fury") %}

> {%= description %}

## Install
{%= include("install-global") %}

## API
{%= comments("index.js") %}

## Author
{%= include("author") %}

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}
```

**Example verbfile.js**

Basic verbfile for projects that need more than a readme for documentation:

```js
var verb = require('verb');

// load data to pass to templates.
verb.data('docs/*.json');
verb.data({author: 'Jon Schlinkert'});

verb.task('default', function() {
  verb.src(['.verb.md', 'docs/*.md'])
    .pipe(verb.dest('./'));
});
```

## API

> See [Template](https://github.com/jonschlinkert/template) for all available methods.

### .data

## [Template](node_modules/template/index.js#L58)

Create a new instance of `Template`, optionally passing default `options` to initialize with.

* `options` **{Object}**: Options to initialize with.    

**Example:**

```js
var Template = require('template');
var template = new Template();
```

## [.use](node_modules/template/index.js#L371)

Proxy to `Router#use()` to add middleware to the engine router. See Router#use() documentation for details.

* `fn` **{Function}**    

If the `fn` parameter is an engine, then it will be
mounted at the `route` specified.

## [.route](node_modules/template/index.js#L421)

Proxy to the engine `Router#route()` Returns a new `Route` instance for the `path`.

* `path` **{String}**    

Routes are isolated middleware stacks for specific paths.
See the Route api docs for details.

## [.param](node_modules/template/index.js#L439)

Proxy to `Router#param()` with one added api feature. The `name` parameter can be an array of names.

* `name` **{String|Array}**    
* `fn` **{Function}**    
* `returns` **{Object}** `Template`: for chaining  

See the Router#param() docs for more details.

Delegate `.METHOD(...)` calls to `router.METHOD(...)`

## [.all](node_modules/template/index.js#L486)

* `path` **{String}**    
* **{Function}**: Callback    
* `returns` **{Object}** `Template`: for chaining  

Special-cased "all" method, applying the given route `path`,
middleware, and callback.

## [.addDelims](node_modules/template/index.js#L625)

Cache delimiters by `name` with the given `options` for later use.

* `name` **{String}**: The name to use for the stored delimiters.    
* `delims` **{Array}**: Array of delimiter strings. See [delims] for details.    
* `opts` **{Object}**: Options to pass to [delims]. You can also use the options to override any of the generated delimiters.    

**Example:**

```js
template.addDelims('curly', ['{%', '%}']);
template.addDelims('angle', ['<%', '%>']);
template.addDelims('es6', ['${', '}'], {
  // override the generated regex
  interpolate: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g
});
```

[delims]: https://github.com/jonschlinkert/delims "Generate regex for delimiters"

## [.useDelims](node_modules/template/index.js#L678)

Specify by `ext` the delimiters to make active.

* `ext` **{String}**    

```js
template.useDelims('curly');
template.useDelims('angle');
```

## [.handleDelims](node_modules/template/index.js#L700)

Specify by `ext` the delimiters to make active.

* `ext` **{String}**    

```js
template.useDelims('curly');
template.useDelims('angle');
```

## [.engine](node_modules/template/index.js#L773)

* `exts` **{String|Array}**: File extension or array of extensions.    
* `fn` **{Function|Object}**: or `options`    
* `options` **{Object}**    
* `returns` **{Object}** `Template`: to enable chaining  

{%= docs("api-engine") %}

Register the given view engine callback `fn` as `ext`. If only `ext`
is passed, the engine registered for `ext` is returned. If no `ext`
is passed, the entire cache is returned.

## [.getEngine](node_modules/template/index.js#L794)

Get the engine settings registered for the given `ext`.

* `ext` **{String}**: The engine to get.    
* `returns` **{Object}**: Object with methods and settings for the specified engine.  

{%= docs("api-getEngine") %}

```js
template.getEngine('.html');
```

## [.getExt](node_modules/template/index.js#L820)

Used in the `.render()` method to select the `ext` to use for picking an engine.

* `template` **{Object}**: Template object    
* `locals` **{Object}**: Locals object    
* `returns` **{String}** `ext`: For determining the engine to use.  

This logic can be overridden by passing a custom
function on `options.getExt`, e.g.:

**Example:**

```js
template.option('getExt', function(template, locals) {
  return path.extname(template.path);
});
```

## [.helper](node_modules/template/index.js#L924)

Register generic template helpers that are not specific to an engine.

* `key` **{String}**: Helper name    
* `fn` **{Function}**: Helper function.    

Helpers registered using this method will be passed to every
engine, so this method is best for generic javascript functions -
unless you want to see Lo-Dash blow up from `Handlebars.SafeString`.

```js
template.helper('lower', function(str) {
  return str.toLowerCase();
});
```

## [.helpers](node_modules/template/index.js#L945)

Register multiple helpers.

* `helpers` **{Object|Array}**: Object, array of objects, or glob patterns.    

```js
template.addHelpers({
  a: function() {},
  b: function() {},
  c: function() {},
});
```

## [.asyncHelper](node_modules/template/index.js#L989)

Register generic async template helpers that are not specific to an engine.

* `name` **{String}**: Helper name.    
* `fn` **{Function}**: Helper function    

As with the sync version, helpers registered using this method will
be passed to every engine, so this method is best for generic
javascript functions.

```js
template.asyncHelper('lower', function(str, next) {
  str = str.toLowerCase();
  next();
});
```

## [.asyncHelpers](node_modules/template/index.js#L1010)

Register multiple async helpers.

* `helpers` **{Object|Array}**: Object, array of objects, or glob patterns.    

```js
template.addAsyncHelpers({
  a: function() {},
  b: function() {},
  c: function() {},
});
```

## [.engineHelpers](node_modules/template/index.js#L1028)

Register an object of helpers for the given `ext` (engine).

* `ext` **{String}**: The engine to register helpers with.    
* `returns` **{Object}**: Object of helpers for the specified engine.  

```js
template.helpers(require('handlebars-helpers'));
```

## [.validate](node_modules/template/index.js#L1264)

* `key` **{String}**: Template key    
* `value` **{Object}**: Template object    

Validate a template object to ensure that it has the properties
expected for applying layouts, choosing engines, and so on.

## [.getType](node_modules/template/index.js#L1370)

Get all templates of the given [type]. Valid values are `renderable`, `layout` or `partial`.

* `type` **{String}**    
* `opts` **{Object}**    

```js
var pages = template.getType('renderable');
//=> { pages: { 'home.hbs': { ... }, 'about.hbs': { ... }}, posts: { ... }}
```

[type]: ./template-types

## [.mergeType](node_modules/template/index.js#L1393)

Merge all templates from the given `type` into a single object.

* `type` **{String}**: The template type to search.    
* `subtypes` **{String}**: Optionally pass an array of subtypes    

If an array of `subtypes` is passed, only those `subtypes`
will be merged and the order in which the subtypes are defined
in the array will be respected.

## [.mergePartials](node_modules/template/index.js#L1433)

Default method for determining how partials are to be passed to engines. By default, all `partial` subtypes are merged onto a single `partials` object. To keep each subtype on a separate object, you can do `template.disable('mergePartials')`.

* `locals` **{Object}**    
* `returns`: {Object}  

If you want to control how partials are merged, you can also
pass a function to the `mergePartials` option:

```js
template.option('mergePartials', function(locals) {
  // do stuff
});
```

## [.findRenderable](node_modules/template/index.js#L1505)

Search all renderable `subtypes`, returning the first template with the given `key`.

* `key` **{String}**: The template to search for.    
* `subtypes` **{Array}**    

  - If `key` is not found an error is thrown.
  - Optionally limit the search to the specified `subtypes`.

## [.findLayout](node_modules/template/index.js#L1521)

Search all layout `subtypes`, returning the first template with the given `key`.

* `key` **{String}**: The template to search for.    
* `subtypes` **{Array}**    

  - If `key` is not found an error is thrown.
  - Optionally limit the search to the specified `subtypes`.

## [.findPartial](node_modules/template/index.js#L1537)

Search all partial `subtypes`, returning the first template with the given `key`.

* `key` **{String}**: The template to search for.    
* `subtypes` **{Array}**    

  - If `key` is not found an error is thrown.
  - Optionally limit the search to the specified `subtypes`.

## [.lookup](node_modules/template/index.js#L1551)

* `plural` **{String}**: The template cache to search.    
* `name` **{String}**: The name of the template.    
* `ext` **{String}**: Optionally pass a file extension to append to `name`    

Convenience method for finding a template by `name` on
the given `plural` cache, with or without a file extension.

## [.create](node_modules/template/index.js#L1588)

Add a new template `sub-type`, along with associated get/set methods.

* `subtype` **{String}**: Singular name of the sub-type to create, e.g. `page`.    
* `plural` **{String}**: Plural name of the template type, e.g. `pages`.    
* `options` **{Object}**: Options for the template type.  
    - `isRenderable` **{Boolean}**: Templates that may be rendered at some point
    - `isLayout` **{Boolean}**: Templates to be used as layouts
    - `isPartial` **{Boolean}**: Templates to be used as partial views or includes
      
* `fns` **{Function|Array}**: Middleware function or functions to be run for every template of this type.    
* `returns` **{Object}** `Template`: to enable chaining.  

When you only specify a name for the type, a plural form is created
automatically (e.g. `page` and `pages`). However, you can define the
`plural` form explicitly if necessary.

## [.renderTemplate](node_modules/template/index.js#L1725)

* `template` **{Object}**: The template object with content to render.    
* `locals` **{Object}**: Locals and/or options to pass to registered view engines.    
* `returns`: {String}  

Render content on the given `template` object with the specified
engine `options` and `callback`.

## [.render](node_modules/template/index.js#L1895)

* `file` **{Object|String}**: String or normalized template object.    
* `locals` **{Object}**: Locals and/or options to pass to registered view engines.    
* `returns` **{String}**: Rendered string.  

Render `content` with the given `options` and optional `callback`.

## [.renderString](node_modules/template/index.js#L1926)

Render the given string with the specified `locals` and `callback`.

* `str` **{String}**: The string to render.    
* `locals` **{Object}**: Locals and/or options to pass to registered view engines.    
* `returns`: {String}  

The primary purpose of this method is to get the engine before
passing args to `.renderBase()`.

## [.renderSubtype](node_modules/template/index.js#L1955)

Returns a render function for rendering templates of the given `subtype`.

* `plural` **{String}**: Template subtype, e.g. `pages`    
* `str` **{String}**: The string to render.    
* `locals` **{Object}**: Locals and/or options to pass to registered view engines.    
* `returns` **{Function}** `params`  

* `returns` **{String}** `string`: The rendered string.  

Mostly used internally as a private method, but it's exposed as a
public method since there are cases when it might be useful, like
for rendering templates in a gulp/grunt/assemble plugin.

## [.renderType](node_modules/template/index.js#L1987)

* `str` **{String}**: The string to render.    
* `locals` **{Object}**: Locals and/or options to pass to registered view engines.    
* `returns`: {String}  

Render the given string with the specified `locals` and `callback`.
## [.src](index.js#L395)

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

## [.dest](index.js#L423)

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

## [.task](index.js#L445)

Define a Verb task.

* `name` **{String}**    
* `fn` **{Function}**    

```js
verb.task('docs', function() {
  verb.src(['.verb.md', 'docs/*.md'])
    .pipe(verb.dest('./'));
});
```

## [.watch](index.js#L461)

Re-run the specified task(s) when a file changes.

* `glob` **{String|Array}**: Filepaths or glob patterns.    
* `fn` **{Function}**: Task(s) to watch.    

```js
verb.task('watch', function() {
  verb.watch('docs/*.md', ['docs']);
});
```

## Run tests

```bash
npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/verb/issues)

## Author
 
**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 
 
**Brian Woodward**
 
+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb) 


## License
Copyright (c) 2014 Jon Schlinkert  
Copyright (c) 2014 Fractal <contact@wearefractal.com>
Released under the MIT license

***

_This file was generated by [verb](https://github.com/jonschlinkert/verb) on November 11, 2014._