---
name: verb
title: Data
engine: hbs
description: "Learn how to get, set and delete data for templates, options and more."
reflinks: ['base-store', 'base-data']
---

{{upper name}} keeps "data" on two different objects, depending on your needs. 

| **Storage object** | **Description** | **Methods** |
| --- | --- | --- |
| `{{name}}.cache.data` | Kept in-memory | `{{name}}.data()` (function) |
| `{{name}}.store.data` | Persisted to disk | `{{name}}.store` (object with methods) |

## {{name}}.data

```js
{{name}}.data({a: 'b'});
// or
{{name}}.data('a', 'b');
console.log({{name}}.cache.data);
//=> {a: 'b'}
```

The `{{name}}.data` method is powered by the [base-data][] plugin. Visit [that project][base-data] to see all available features and options.

## {{name}}.store

```js
{{name}}.store.set({a: 'b'});
// or
{{name}}.store.set('a', 'b');

console.log({{name}}.store.data);
//=> {a: 'b'}
```

The `{{name}}.store` object is powered by the [base-store][] plugin. Visit [that project][base-store] to see all available features and options.
