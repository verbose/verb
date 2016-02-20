---
name: verb
title: Data
engine: hbs
description: "Learn how to get, set and delete data for templates, options and more."
related: ['#store']
reflinks: ['base-store', 'base-data']
---

Verb keeps "data" on two different objects, depending on your needs. 

| **Storage object** | **Description** | **Methods** |
| --- | --- | --- |
| `verb.cache.data` | Kept in-memory | `verb.data()` (function) |
| `verb.store.data` | Persisted to disk | `verb.store` (object with methods) |

## verb.data

```js
verb.data({a: 'b'});
// or
verb.data('a', 'b');
console.log(verb.cache.data);
//=> {a: 'b'}
```

The `verb.data` method is powered by the [base-data][] plugin. Visit [that project][base-data] to see all available features and options.

## verb.store

```js
verb.store.set({a: 'b'});
// or
verb.store.set('a', 'b');

console.log(verb.store.data);
//=> {a: 'b'}
```

The `verb.store` object is powered by the [base-store][] plugin. Visit [that project][base-store] to see all available features and options.
