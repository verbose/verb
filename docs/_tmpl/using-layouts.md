## Using layouts

> Layouts are used to wrap other templates with common or project-wide content.

In your verbfile.js:

```js
var verb = require('verb');

// register a layout with verb.
verb.layout('default.md', {content: '# {%= name %}\n\n<<% body %>>\n'});

// register a page, and use the layout by adding the `layout` property.
verb.page('api.md', {content: 'API docs...', layout: 'default.md'});

//=> '# {%= name %}\n\nAPI docs...\n'
```

**What's with the wierd `body` syntax?**

Verb is a documentation generator, the crazy `body` syntax is verb's way of ensure that we avoid collision with templates that might be in code examples.
