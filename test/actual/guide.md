# Introduction to verb

> verb makes it easy to build project documentation using simple markdown templates, with no configuration required.


## How does it work?

Throw some markdown files in the `docs` directory of your project and Verb will use them to [generate your documentation](#core-concepts).

Examples:

* Add a


## Why use Verb?

* No configuration necessary
* Sensible defaults
* Super fast.

_Although zero configuration is required, Verb has a robust [API](#TODO) and is highly configurable via options._


## Getting Started




data and content templates.




### Core Concepts

* Templates
* Tags
* Filters
* Data
* Content

## Templates

> A template is a document or document fragment that contains variables that will be replaced (by the template engine) with actual data, content or other documents.

verb has built-in support for the following template concepts:

* **Layouts**: used to "wrap" pages with common elements, such as site-wide navigation, footers, the `<head></head>` section and so on.
* **Pages**: typically have a 1-to-1 relationship with the actual generated HTML pages in a project, e.g. `about.hbs` => `about.html` or `about/index.html`. But pages can also be dynamically generated from config data.
* **Partials**: document fragments or snippets of code that will be included, inserted or embedded into other templates at build time.

Let's walk through these in more detail.

### Layouts

A basic layout might look something like this:

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
  </head>
  <body>
    <!-- insertion point for any page using this layout -->
    {{> body }}
  </body>
</html>
```

### Pages

> Pages, generally structural in nature, are optionally wrapped with layouts and contain _more HTML than textual content_.

A basic page might look something like this:

```handlebars
<div class="page-header">
  <h2 id="about">About Us</h2>
</div>

<div class="docs-section">
  <div class="page-header">
    <h2 id="team">Team</h2>
  </div>
  <!-- This markdown helper will include the content from `team.md` and convert it to HTML -->
  {{md 'team'}}
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</div>

<div class="docs-section">
  <div class="page-header">
    <h2 id="history">History</h2>
  </div>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</div>
```

### Partials

> Partials allow you to define a chunk of code one time and use it in multiple places.

Partials are often used for UI components such as buttons, navbars or modals. But they can also be used for any other snippets or sections of code that might be repeated across multiple pages, or for code that might otherwise be reusable in some way. Partials are easy to spot since they use a `>`, which is the special [Handlebars.js syntax](http://blog.teamtreehouse.com/handlebars-js-part-2-partials-and-helpers)) that is only used with partials: e.g. `{{> foo }}`.

Continuing with the `layout` example from above, to use a partial for the `head` section simply create a new file, such as `head.hbs` or whatever you prefer, then extract the code from the head section and add it to the new file:

```handlebars
<!-- `head.hbs` partial -->
<meta charset="UTF-8">
<title>{{title}}</title>
```

Before continuing on, ensure that the filepath to your newly created partial, `head.hbs`, is specified in your project's configuration so verb can take note of it, ensuring that the partial can be used in your templates.

Now, to actually use the partial, add the `{{> head }}` template to the `head` section of your layout where the code was removed. verb makes this simple by allowing you to use the name of the file you just created as the name of the partial:

```handlebars
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- The `>` means that this is a partial and its content will be inserted here. -->
    {{> head }}
  </head>
  <body>
    {{> body }}
  </body>
</html>
```

## Content

> Content is written in an easy-to-read plain text format such as markdown. verb can be extended to convert any format.

Additionally, verb can convert your content to HTML according to your preferences:

* Convert 1-to-1 into HTML pages, e.g. `about.md` converts to `about.html` (or `about/index.html` if you use [permalinks](#TODO))
* Insert into other pages (as includes)
* Concatenate several content files together before converting to pages or being inserted into (template) pages. [assemble.io/helpers/](http://assemble.io/helpers/) is a good example of this. Each helper/section on this page is created from more than [100 individual markdown files][helpers].


## Data

> Data from specified JSON or YAML files is made available for use in your templates.

This is best explained through examples, so given we have a partials for generating buttons, `button.hbs`:

```handlebars
<button type="button" class="btn {{modifier}}">{{text}}</button>
```

And given we have a corresponding file, `button.json`, with the following data:

```json
[
  {
    "text": "Success!",
    "modifier": "btn-success"
  },
  {
    "text": "Error!",
    "modifier": "btn-error"
  },
  {
    "text": "Warning!",
    "modifier": "btn-warning"
  }
]
```

When used like this:

```handlebars
{{#each button}}
  {{> button }}
{{/each}}
```
Which results in:

```html
<button type="button" class="btn btn-success">Success!</button>
<button type="button" class="btn btn-error">Error!</button>
<button type="button" class="btn btn-warning">Warning!</button>
```

Beyond using data files to pass to templates as context, they can also be used for global project configuration and setting options. See the [documentation for data]() to learn more.


## Extending verb

_TODO_

* Plugins
* Helpers
* API


[permalinks]: https://github.com/assemble/assemble-contrib-permalinks
[helpers]: https://github.com/assemble/assemble-docs/tree/master/src/content/helpers