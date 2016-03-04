---
name: verb
title: Middleware
engine: hbs
description: ""
related: ['en-route']
reflinks: ['en-route']
---

## What is middleware?

A "middleware" is a function that has access to the [view](view.md) object, and a callback function that represents the `next` middleware in the application’s build cycle.

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the [view](view.md) object.
- Call the `next` middleware function in the stack.

### Router methods and handlers

- **Router methods**: similar to the router METHODS in [express][], but instead of representing [HTTP METHODS][verbs], here router methods represent significant points during the build cycle.

- **Handler**: The `.handle` method


- middleware is "registered" by a router method



## Build lifecycle

The build lifecycle describes the various stages, events and tranformations that occur from start to finish.

## Built-in handlers

- `onLoad`
- `preRender`
- `preCompile`
- `preLayout`
- `onLayout`
- `postLayout`
- `onMerge`
- `postCompile`
- `postRender`

### Pipeline handlers

Assemble adds the following handlers, called after a `view` enters assemble's ([vinyl][]) `.src` stream:

- `onStream`: called by the `.toStream` method upon adding a view to the `.src` stream
- `preWrite`: called by the `.dest` method before writing `view.contents` to the file system
- `postWrite`: called by the `.dest` method after writing `view.contents` to the file system

### Custom handlers

...


## Caveats

Their are many advantages to using middleware as a part of your application's build cycle, but there is also at least one common potential pitfalls you should be aware of:

**A middleware will only when called by its handler**

This means, for instance, that if you compile a view using the `.compile` method, and you never call the `.render` method, then the `.render` middleware handler will **not be called**, thus any custom `.preRender` or `.postRender` middleware you're registered will not be run.

In most cases, this should be acceptable and considered correct. However, there will be cases where this behavior causes confusion, but we know of at least a couple of ways to work around it.

### Workarounds

One solution to the "why wasn't my middleware called?" problem is to call the "missing" handlers directly. For instance, continuing with the previous example, if you need a `.render` middleware to be called, you could:

- Call the missing handlers directly, or
- Create noops to fill in build cycle gaps and trigger the handlers

**Call the missing handlers directly**

```js
app.preCompile(/./, function(view, next) {
  app.handle('preRender', view, next);
});

app.postCompile(/./, function(view, next) {
  app.handle('postRender', view, next);
});
```

This solution brings its own set of complications. In particular, now the `.preRender` method is being called after `.preCompile`, when `.preRender` should be called first. Since middleware are executed in the order in which they are defined, as long as you register all other `.preCompile` middleware after the one in the example, you should be okay. But the following workaround might be a better solution whenever possible. 

**Create noops to trigger handlers**

A more reliable solution is to create noops that will trigger missing handlers, ideally without any negative side effects.

For example, instead of skipping `.render` altogether (because we only want to `.compile` a view), we could create a basic custom engine, or override the render method on a registered engine so that `.render` will not alter `view.contents`, allowing us to call `.render` instead of `.compile`. 

For example, a basic noop engine might look like this:

```js
app.engine('foo', function(view, locals, cb) {
  cb(null, view);
});
```

Or, to override the `.render` method on a registered engine:

```js
var engine = app.engine('foo');
engine.render = function(view, locals, cb) {
  cb(null, view);
};
```

****

## Middleware guidelines

Guidelines for authoring durable, reliable middleware:

- middleware should do one thing, and do it well
- middleware should not rely on other middleware, with rare exception
- middleware should be able to run before or after any other middleware called by the same handler. For example, if two different `.onLoad` middleware are registered, either should be able to run first or last, without effecting the results of either middleware.


## Router methods

Router methods are similar to the router METHODS in [express][], but instead of representing [HTTP METHODS][verbs], the router methods here represent significant points or "stages" during the build. 

**Summary**

- `onLoad`: Immediately after a view is loaded, as a last step just before adding the view to a collection.
- `preLayout`: Immediately before the first [layout][] in a [layout-stack][] is applied to a view.
- `onLayout`: Called after each [layout][] in a [layout-stack][] is applied.
- `postLayout`: Called after all [layouts][] have been applied to a view.
- `onMerge`: Called directly before [partials][] collections are merged onto the [context][].
- `preCompile`: Called before compiling a view.
- `postCompile`: Called after compiling a view.
- `preRender`: Called before rendering a view.
- `postRender`: Called after rendering a view.


## Methods

### onLoad

Immediately after a view is loaded, as a last step just before adding the view to a collection.

**Example**

Parse [YAML Front Matter][yaml] and add the parsed data object to `view.data`:

```js
var matter = require('parser-front-matter');
app.onLoad(/\.hbs$/, function(view, next) {
  matter.parse(view, next);
});
```

### preLayout

Immediately before the first [layout][] in a [layout-stack][] is applied to a view.

```js
app.preLayout(/\.hbs$/, function(view, next) {
  // do something with `view`
  next();
});
```

### onLayout

Called after each [layout][] in a [layout-stack][] is applied.

```js
app.onLayout(/\.hbs$/, function(view, next) {
  // do something with `view`
  next();
});
```

### postLayout

Called after all [layouts][] have been applied to a view.

```js
app.postLayout(/\.hbs$/, function(view, next) {
  // do something with `view`
  next();
});
```

### onMerge

Called directly before [partials][] collections are merged onto the [context][].

```js
app.onMerge(/\.hbs$/, function(view, next) {
  // do something with `view`
  next();
});
```

### preCompile

Called before compiling a view.

```js
app.preCompile(/\.hbs$/, function(view, next) {
  // do something with `view`
  next();
});
```

### postCompile

Called after compiling a view.

```js
app.postCompile(/\.hbs$/, function(view, next) {
  // do something with `view`
  next();
});
```

### preRender

Called before rendering a view.

```js
app.preRender(/\.hbs$/, function(view, next) {
  // do something with `view`
  next();
});
```

### postRender

Called after rendering a view.

```js
app.postRender(/\.hbs$/, function(view, next) {
  // do something with `view`
  next();
});
```


[yaml]: https://en.wikipedia.org/wiki/YAML
[verbs]: http://expressjs.com/api.html#router.METHOD

{%= reflinks(['express']) %}





(Some wording in this document was borrowed from [express's middleware docs][express])

[express]: http://expressjs.com/en/guide/using-middleware.html