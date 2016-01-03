---
title: <%= upper(name) %> Configuration
---

### package.json

> setting options in package.json

If your package.json file has a `{{name}}` property with an `options` object, {{upper name}} will use it to extend the `{{name}}.options` object.

**Example**

```json
{
  "name": "my-project",
  "description": "It's awesome, seriously.",

  "{{name}}": {
    "options": {}
  }
}
```
