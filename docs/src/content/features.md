# Features

## Fast

Assemble is fast. Depending on setup, plugins, customizations and other factors, a small site with 10-15 pages can be generated in ~300 ms.

## Flexible

Assemble gives you complete control over how and where you build files. If you've used [gulp][], you'll already be familiar with Assembles file-sytem API.

## Template collections

Assemble has rich support for template collections
- assemble supports template "types": `renderable`, `layout` and `partial`. Defined when a collection is created, types add special behavior and decorate methods related to each type onto the collection and its views (e.g. `partials` will be passed to the rendering engine _as partials_, helpers are created for getting partials, etc). Collections can use one or more type.
- assemble supports instance plugins (like metalsmith), so you can add do anything you want to an instance
- assemble collections can use plugins
- assemble views (templates) can use plugins (assemble views are vinyl files)
- assemble supports pipeline plugins (like gulp), so you can do in-stream transformations on files (views)

## Template engines

- assemble allows you to use any template engine, and allows you to use more than one template engine during the same build.

## Middleware and routes

- assemble supports middleware, similar to express.
