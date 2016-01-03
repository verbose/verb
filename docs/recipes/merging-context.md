# Merging context

> This recipe shows different strategies for merging the context object before rendering, based on which data should be given preferential treatment.

Learn more about [context](./terminology#context)

## Middleware

If you need control over how context is merged on a file-by-file basis, one solution is to create a custom `preRender` middleware.

**Example**

Let's say you have a view (any template. can be a partial, page, layout, etc.) with the following contents:

```hbs
---
title: Foo
---

This is {{title}}
```

**Pre-render middleware**

Try the following

```js
var merge = require('mixin-deep');
var app = assemble();

// merge data onto `app.cache.data`
app.data({title: 'Site'});

// pre-render middleware, called right before the engine renders
app.preRender(/\.hbs$/, function(view, next) {
  console.log(view.data);
  //=> { title: 'Foo' }
  console.log(app.cache.data);
  //=> { title: 'Site' }

  file.data = merge({}, app.cache.data, file.data);
  next();
});
```

To create a re-usable middleware:

```js
function mergeContext(app, locals) {
  return function(view, next) {
    file.data = merge({}, app.cache.data, file.data, locals);
    next();
  };
}

// usage
app.preRender(/\.hbs$/, mergeContext(app, {title: 'Foo'}));
app.preRender(/\.txt$/, mergeContext(app, {title: 'Bar'}));
app.preRender(/\.ejs$/, mergeContext(app, {title: 'Baz'}));
```