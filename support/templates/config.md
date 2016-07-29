---
title: Verb config
---

The `verb` object in package.json may be used to define configuration settings for the current project. 

## Overriding values

Most of the configuration options defined in package.json will be used as "project-wide" settings. 

For example, the `layout` defined in package.json will be applied to all templates in the project. This is not ideal in many cases, so verb gives you several ways to override these settings in cases where you need to be more granular.

- **[front-matter](front-matter.md)**: For most options, values defined in the [front matter](front-matter.md) of individual templats will override the values defined in package.json.
- **[middleware](middleware.md)**: 
- **[plugin](pipeline-plugins.md)**: 

## Supported properties

- [layout](#layout)
- [lint](#lint)
- [middleware](#middleware)
- [plugins](#plugins)
- [reflinks](#reflinks)
- [related](#related)
- [run](#run)
- [tasks](#tasks)
- [toc](#toc)


### layout

Define the "default" [layout](layouts.md) to use for all templates in the project. 

**Type**: `String`

**Default**: `undefined`

**Example**

```js
{
  "layout": "default"
}
```

### lint

**Type**: `Boolean`

**Default**: `undefined`

**Example**

```js
{
  "lint": true
}
```

### middleware

**Type**: `Object`

**Default**: `undefined`

**Example**

```js
{
  "middleware": {}
}
```

### plugins

**Type**: `Object`

**Default**: `undefined`

**Example**

```js
{
  "plugins": {}
}
```

### reflinks

**Type**: `Object`

**Default**: `undefined`

**Example**

```js
{
  "reflinks": {}
}
```

### related

**Type**: `Object`

**Default**: `undefined`

**Example**

```js
{
  "related": {}
}
```

### run

**Type**: `Boolean`

**Default**: `undefined`

**Example**

```js
{
  "run": {}
}
```

### tasks

**Type**: `Array`

**Default**: `undefined`

**Example**

```js
{
  "tasks": {}
}
```

### toc

**Type**: `Boolean|Object`

**Default**: `undefined`

**Example**

```js
{
  // converted to "{render: true}"
  "toc": true
}
// or
{
  "toc": {
    "render": true,
    "method": "postRender"
  }
}
```

**Options**

- `render`: actually add the Table of Contents to the file.