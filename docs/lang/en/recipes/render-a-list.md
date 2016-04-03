# Rendering a list

> This recipe shows how to render a list from a view collection

## Preparation

First, create an `verbfile.js`.  The rest of this recipe assumes that you have the following defined:

```js
var assemble = require('assemble');
var app = assemble();
```

**Add a "log" helper**

Next, let's add a `log` helper that we can use for inspecting the context and debugging:

```js
app.helper('log', function(context) {
  console.log(context);
});
```

_(Learn more about [inspecting the context](./inspecting-the-context.md))_

## Create a collection

We need a collection to use for our list, so let's create a `pages` collection:

```js
app.create('pages');
```

### Add pages to the collection

```js
app.page('foo', 'this is foo');
app.page('bar', 'this is bar');
app.page('baz', 'this is baz');
```

## Build the context

Before we can render a list, we need to expose the 

```js
/**
 * Middleware
 *
 * Add the `pages` collection to `view.data`,
 * which exposes it to the context for rendering
 */

app.preRender(/./, function(view, next) {
  view.data.pages = app.views.pages;
  next();
});

/**
 * Task for rendering "site"
 */

app.task('site', function() {
  app.pages('src/pages/**/*.hbs');
  app.partials('src/partials/*.hbs');
  app.layouts('src/layouts/*.hbs');

  // use the `toStream` method instead of `src`
  // so that all pages are available at render time
  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(extname())
    .pipe(app.dest('_build'));
});
```

Layout: `default.hbs`

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>{{ title }}</title>
  </head>
  <body>
    {% body %}

    {{> list }}
  </body>
</html>
```

Partial: `list.hbs` (or you could add this inline in the layout)


```handlebars
{{#each pages}}
{{log .}}
{{@key}}
{{/each}}
```

## Inspecting the context


Since views are vinyl files, you'll need to inspect them to see what's available to use. To make this easier, you might also try adding a helper to see what's on the context:

**Example**

Create a helper, arbitrarily named `ctx` (for context) or whatever you want, and add it to your `verbfile.js`:

```js
app.helper('ctx', function(context) {
  console.log(arguments);
  console.log(context);      // the object passed to the helper

  console.log(this);         // handlebars context
  console.log(this.options); // assemble `options`
  console.log(this.context); // context of the current "view"
  console.log(this.app);     // assemble instance
});
```

Then use the `ctx` helper inside the `{{#each}}` loop:

```handlebars
{{#each pages}}
  {{ctx .}}
{{/each}}
```

And try it outside the loop:

```handlebars
{{ctx .}}
```


## FAQ

**What does "render a list" mean?**

When a template is rendered, placeholder variables are replaced with actual values from the "context" object. Sometimes it's necessary to render a list of something, like pages, posts, related links, and so on. To do so, the _context_ must contain an object (or array) representation of the list we wish to render. 

**Why isn't my list rendering?**

A common mistake is trying to render a list of _something_ before all items in that list have actually been loaded onto the context. 

For example, if you're using `app.src()` (or `gulp.src()`) to read in a glob of "pages" (or posts, etc.), and you try to generate a list of pages, you might be wondering why the list isn't rendering. This is because, when using `.src()`, files are rendered one-by-one, so the entire context (of all pages) is not yet available until the last page has already been rendered.

The good news is that this is easily solved by building up the list in the flush function of a plugin, or by _not using `app.src()` to load pages_. Instead, we can use the `.toStream()` method. The latter is what this recipe shows.
