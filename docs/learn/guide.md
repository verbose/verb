## Core Concepts

#### The Basics

* Templates: `README.tmpl.md`
* Includes: `about.md`
* Data: `package.json`

#### Advanced

* Tags
* Filters
* Mixins
* Data: Custom data sources


## Templates

## Includes

## Data

## Extending {%= name %}

_TODO_

* Plugins
* Helpers
* API


## Options

### Custom delimiters

You can customize delimiters to be anything you want, but make sure you choose your delimiter syntax wisely to avoid collision with code that is used in examples and so on. Also keep in mind that you'll be breaking compatibility with Verb's boilerplates, curated templates and probably templates hosted by other community members as well.

Enable custom delimiters with the `delims` option:

```js
options: {
  delims: ['<<', '>>']
}
```

Verb uses the [delims](https://github.com/jonschlinkert/delims) library to enable custom delimiters, please visit that project to see all available options and documentation.