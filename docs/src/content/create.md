---
title: create
---

The `.create` method is used for creating custom "view collections". 

**Params**

- `name` **{String}**: the name of the collection to create
- `options` **{Object}**: options to use when creating the collection

**Example**

To create a "pages" collection:

```js
app.create('pages');
```

A few things happened when the `.create` method was used:

- The `page` and `pages` methods were decorated onto verb (verb automatically detects inflections - plural and singular forms)
- A `pages` object was added to `verb.views` for caching views, so when pages are created they can be found on `verb.views.pages`

## FAQ

- View collections are instances of the [Views](Views.md) class.
- When the `.create` method is called, verb invokes the [Views](Views.md) class to create an instance of `Views`