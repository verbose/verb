> How do you differentiate between assemble and metalsmith

There is not much similar between the two. The examples show how to build projects using a similar style to metalsmith, but that's about it.

- assemble has rich support for template collections
- assemble supports template "types": renderable, layout and partial - defined when a collection is created, to add special behavior and methods related to the type; and collections can use one or more type.
- assemble does not limit how and where you build files
- assemble supports instance plugins (like metalsmith), so you can augment an instance
- assemble supports pipeline plugins (like gulp)
- assemble collections can use plugins
- assemble views (templates) can use plugins (assemble views are vinyl files)
- assemble supports any template engine, and allows you to use more than one template engine during the same build.
- assemble supports middleware, similar to express. (plugins and middleware serve very different purposes, and are used in completely different ways. more on this below)

## Plugins

- **instance plugins**: Instance plugins are registered with the `.use()` method and are called immediately upon instantiation. The only parameter exposed to an instance plugin is the instance of `app` (assemble), `collection`, or `view`.
- **pipeline plugins**: Pipeline plugins are registered with `.pipe()` and are used on vinyl `file` objects in a stream (note that all assemble "views" are instances of vinyl files)

### Instance plugins

**Example instance plugin**

```js
var assemble = require('assemble');
var app = assemble();

app.use(function(app) {
   // do stuff to app or `this` (the assemble instance)
});
```

### Collection plugins

Collections themselves are like mini-application instances, and collection plugins are registered and used the same way as instance plugins, with the `.use()` method, but on a specific collection. Collection plugins are called immediately upon instantiation of the collection.

**Example collection plugin**

```js
var assemble = require('assemble');
var app = assemble();

// register a plugin to be used on all collections
app.use(function(app) {
   // do stuff to app or `this` (the assemble instance)

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
var assemble = require('assemble');
var app = assemble();

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

## Middleware

(this description was inspired by express's middleware description)

Middleware functions are functions that have access to the `file` object (or in assemble's case, the `view` object), and a callback function that represents the `next` middleware in the application’s build cycle.

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the `file` object.
- Call the `next` middleware function in the stack.