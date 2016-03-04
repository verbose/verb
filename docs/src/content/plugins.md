---
name: verb
title: Plugins
engine: hbs
description: ""
related: ['assemble-core']
reflinks: []
---

## Plugin types

- **instance plugins**: Instance plugins are functions that are invoked by the `.use()` method and have access to `app`, `collection`, or `view`, depending on where and how the plugin is registered.
- **pipeline plugins**: Pipeline plugins are registered with `.pipe()` and are used on vinyl `file` objects in a stream (note that all verb "views" are instances of vinyl files)

### Instance plugins



**Example instance plugin**

```js
var verb = require('verb');
var app = verb();

app.use(function(app) {
  // do stuff to app (verb instance, also exposed as `this)
});
```

### Collection plugins

Collections themselves are like mini-application instances, and collection plugins are registered and used the same way as instance plugins, with the `.use()` method, but on a specific collection. Collection plugins are called immediately upon instantiation of the collection.

**Example collection plugin**

```js
var verb = require('verb');
var app = verb();

// register a plugin to be used on all collections
app.use(function(app) {
   // do stuff to app or `this` (the verb instance)

   // return a function to be use used as a collection plugin
   return function(collection) {
      // do stuff to `collection`
   };
});
```

The `app.create()` method (used for creating custom collections) returns the collection instance. So collection plugins can be chained from create as well.

```js
app.use(function() {
  return function(collection) {
    // do stuff to (every) `collection`
  }
});

app.create('pages')
  .use(function(pages) {
    // do stuff to `pages` collection
  });

app.create('posts')
  .use(function(posts) {
    // do stuff to `posts` collection
  });
```

**Example view plugin**

```js
var verb = require('verb');
var app = verb();

// register a plugin to be used on all views, from all collections
app.use(function(app) {
  return function(collection) {

    // return a function from a collection plugin to be used
    // as a view plugin
    return function(view) {
      // do stuff to `view`
    };
  };
});
```

**Register view plugins on specific collections**

```js
app.use(function(app) {
  // do stuff to `app`
  return function(collection) {
    // do stuff to (every) `collection`
    return function(view) {
      // do stuff to (every) `view`
    };
  };
});

app.create('pages')
  .use(function(pages) {
    return function(page) {
      // do stuff to `page`
    };
  });

app.create('posts')
  .use(function(posts) {
    return function(post) {
      // do something to `post`
    };
  });
```

**Use cases for collection/view plugins**

Here are just a few examples

- `permalinks`: You might have a permalink plugin that modifies the `dest` path a particular way for blog `posts`, and a different way for `pages`. You could register the same plugin with both collections, just using different settings/options. Also, you could implement this functionality at the view level or collection level, depending on how granular your plugin needs to be.
- `pagination`
- `groups` and `lists`
- `sorting`

_(this is for the `templates` docs, but it will help explain how plugins work in `base`. you obviously already know a lot about plugins, so this is for anyone who might find it useful)_

# Plugins

> Overview of how `Templates` plugins work

## App

The following example shows a `plugin` that will be invoked by the `.use` method. Example: `app.use(plugin)`. When invoked, the plugin function is passed the application instance (`app`) as its only argument.

![plugins-app](https://cloud.githubusercontent.com/assets/383994/13402852/311b9d88-dee0-11e5-944b-200ba56f42fe.png)

The plugin stops there and will not be called again, **unless the plugin returns a function**. If a function is returned it will be pushed onto the `app.fns` array and then called on each collection that is created using the `app.create`, `app.collection`, or `app.list` methods.

In the next example, a function is returned from the plugin so that it can be called again later.

## Collection

![plugins-collection](https://cloud.githubusercontent.com/assets/383994/13402856/34dd996c-dee0-11e5-8def-f0b739ff10ca.png)

The plugin stops there and will not be called again, **unless the plugin returns a function**. If a function is returned it will be pushed onto the `collection.fns` array and then called on each view that is added to the collection.

In the next example, we'll return a function inside the `collection` plugin, so that it can be called again later.

## View

![plugins-view](https://cloud.githubusercontent.com/assets/383994/13402861/37fc7032-dee0-11e5-8489-04f392cb9370.png)

End of the line...

# Short-circuit: "smart plugins"

> Don't like all the function nesting? Want to register your plugin with `app` but only have it run on specific objects? No problem, just short-circuit the plugin!

Every class has a boolean `.is*` property that is useful for checking the instance name. For example, the `Templates` class has an `isTemplates` property, view collections have `isViews`, and views have `isView`. (all "apps", like `Templates`, `Assemble`, `Generate`, etc. also have `isApp` as a convenience).

To make your plugins "smarter" and eliminate the nesting, try the following:

![plugins-short-circuit](https://cloud.githubusercontent.com/assets/383994/13405180/33cea2a4-deeb-11e5-864d-4fbab7510c22.png)

## Generators

![plugins-generators](https://cloud.githubusercontent.com/assets/383994/13413383/184bc5de-df18-11e5-815c-b968d5c676a4.png)
