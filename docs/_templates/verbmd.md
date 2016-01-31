# .verb.md

> .verb.md is a markdown template that Verb uses to generate your project's readme.

If your project has a `.verb.md` template, verb will automatically render it using data from your project's package.json file.

## Example .verb.md

You can use any variables, helpers, templates or data you want in Verb documentation. This example below just happens to be the template that Verb's maintainers like on their own projects.

Below we'll describe each section.

```markdown
# {%%= name %} {%%= badge("fury") %}

> {%%= description %}

## Install
{%%= include("install") %}

## API
{%%= apidocs("index.js") %}

## Author
{%%= include("author") %}

## License
{%%= copyright() %}
{%%= license() %}

***

{%%= include("footer") %}
```

_(before going further, please read [how verb works](./how-verb-works.md) if you need a primer on how these templates work.)_

There are only a couple of template variables used, the rest of example consists of [helpers](./helpers.md). Let's go over all of them.


## Variables

Simple variables, like `name` are typically used when their values can be resolved using data from package.json without doing a lot of work to get the data.

### name

Uses the value of the `name` property from package.json.

```js
{%%= name %}
```

Uses the `description` property from package.json.

```js
> {%%= description %}
```

## Helpers

Helpers are used when data needs to be updated dynamically, or when it needs to be calculated

### badge

This is a helper that gets badge templates from node_modules and renders them using data in package.json. There are other badges, like `travis`, but you can add your own if you want or do a PR to verb to add more.

```js
{%%= badge("fury") %}
```

### description

```js
{%%= include("install") %}
```

```js
{%%= apidocs("index.js") %}
```

```js
{%%= include("author") %}
```

```js
{%%= license() %}
```
```js
{%%= copyright() %}
```

```js
{%%= include("footer") %}
```
