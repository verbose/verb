# Verb Overview

> Stuff you might find useful to know about Verb.

## Setting variables

### inside a document

If you need to override a variable on the context, you can set variables directly inside a document. In fact, there are multiple ways to do this:

**Front matter**

```html
---
foo: "bar"
---

{%%= foo %}
//=> "bar"
```

**Lo-Dash template**

```js
{%% var foo = "bar" %}
{%%= foo %}
//=> "bar"
```

**Helper locals**

If you're using a helper, you can pass data as the second parameter:

```js
{%%= include("author", {username: "jonschlinkert"}) %}
```

## Includes

**Headings**

When using the `docs` or `include` helpers, Verb adds one heading level to the heading levels set in the includes to ensure that they flow with rest of the document.

So `##` becomes `###`.

**cwd**

Change the current working directory (the directory to use for getting templates):

```js
{%%= include("foo", {cwd: "my-includes"}) %}
```
