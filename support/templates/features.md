---
title: Features
---

* Create your own documentation generator
* Render templates
* [Generate a README.md][verb-readme-generator] from a template

+ **Tasks** - run [gulp][]-like tasks. Verb's task system is powered by [bach][], the same library used in [gulp][] v4.0.
+ **Generators** - powerful flow control, with support for [generate][] generators (verb is built on top of generate)
+ **"Smart" plugins** - highly pluggable, with 75+ [smart plugins]() available for creating custom verb applications. Additionaly, most [base][], [generate][], [assemble][], and [update][] plugins can be used with verb.
+ **Streams** - methods for working with the file system and streams, with full support for [assemble][] and [gulp][] plugins
+ **Markdown** - Create markdown documentation from templates
+ **Templates** - Render templates using any template engine, such as [handlebars][], [lodash][] or [swig][]. Or any engine supported by [consolidate][].
+ **Layouts and partials** - Support for layouts, partials, and custom template collections
+ **Collections** - First class template collection support, powered by the [templates][] library
+ **Helpers** - Async and sync helper support. Use any helpers from [template-helpers][], [handlebars-helpers][], or any helper from the [helpers org](https://github.com/helpers).

## Bonus features

### Plugin ecosystem

Verb is build on [base][] and shares a common plugin ecosystem with the following applications:

- [generate][]: generat projects
- [assemble][]: build projects
- [update][]: maintain projects

### Easy to extend

TODO

```js
module.exports = function(verb) {
  verb.use(require('verb-readme-generator'));

  verb.task('default', ['readme'], function(cb) {
    cb();
  });
};
```
