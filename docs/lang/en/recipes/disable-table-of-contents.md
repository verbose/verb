# Disable Verb's built-in TOC

A couple of Verb's built-in layouts include a `<!!-- toc -->` tag, which is used as a placeholder to drop the automatically generated Table of Contents into your document. 

Here are three ways to disable the TOC:

**1. Front-matter**

Add a section of YAML front-matter to your document with a `toc` property.

```markdown
---
toc: false
---

## Usage

Some really useful information, that you can use - because it's so useful.

```

Verb uses [falsey][] to check values for just a few different properties, including `toc`. So any value that the falsey lib evaluates as `falsey` will disable the `toc`.

**2: verb config**

Disable the TOC by defining it on an `options` property in your [local verb config](./settings.md):

```json
{
  "name": "my-project",
  "verb": {
    "layout": "default",
    "options": {
      "toc": false
    }
  }
}
```

**3: verb.option()**

Use the `option` API to disable the TOC:

```js
verb.option('toc', false);
```

[falsey]: https://github.com/jonschlinkert/falsey