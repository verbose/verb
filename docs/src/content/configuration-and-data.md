---
title: Configuration and data
---

_(WIP)_

## Overview

**Persisted**

* `app.store.data`: global config store
* `app.local.data`: project config store
* `app.pkg.data`: package.json config
* `app.questions[key].answer.data`: every question has its own data store, with one answer per directory, per locale - as well as one default answer per locale.

**In-memory**

- `app.answers.data`
- `app.cache.data`


## Comparison

Verb keeps "data" on two different objects, depending on your needs.

| **Storage object** | **Description** | **Methods** |
| --- | --- | --- |
| `app.cache.data` | in-memory | `app.data()` (method) |
| `app.store.data` | persisted | `app.store` (object with methods) |
