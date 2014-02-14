## Overview of available options

[Also see examples →](./DOCS.md#examples)
```js
readme: {
  options: {
    readme: '',
    templates: '',
    metadata: '',
    sep: '\n',
    prefixes: [],
    contributing: true
  }
}
```

## readme
Type: `String`
Default: `./node_modules/phaser/tasks/templates/README.tmpl.md`

By default, if no options are specified the task will look for a `README.md.tmpl` template to use, if none is found the task will use the "starter" file supplied by `phaser` (more detail below). Example:

```js
readme: {
  options: {
    readme: 'path/to/custom/README.md.tmpl'
  }
}
```

1. If the `readme` options is defined, the task will use that custom template.
1. If (1) is undefined, the task uses the directory defined by `options: { docs: ''}`
1. If (2) is undefined, the task checks if `README.tmpl.md` exists in the `./docs` directory (without having to define it in the options)
1. if (3) is undefined, `options: { resolve: { readme: ''}}` attempts to automagically use a `README.tmpl.md` template from `node_modules`. The module must must be defined in `devDependencies`. Note that for a README template to resolve properly from `node_modules`, the `main` property in the `package.json` of the module being referenced must specify the path to the template. This option is probably most useful when you plan to use the same README template on a number of projects.
1. If (4) is undefined, the task uses the "starter" README template from `phaser`.


## metadata
Type: `Object`
Default: `package.json`

Optional source of metadata to _extend the data object_ that is passed as context into the templates. Context of the data object is the value of `this`, and properties in `package.json` will be ignored when matching properties are defined on the `metadata` object. Example:

```js
readme: {
  options: {
    metadata: {
      name: 'Foo',
      description: 'This is foo.'
    }
  }
}
```

### data files

Or specify the path or paths to any `.json` or `.yml` files to use. Any of the following formats will work:

```js
readme: {
  options: {
    metadata: 'docs/metadata.json'
  }
}
```

Array of files:

```js
readme: {
  options: {
    metadata: ['docs/one.json', 'docs/two.yml'],
  }
}
```

[minimatch][] (wilcard/globbing) patterns:

```js
readme: {
  options: {
    metadata: ['docs/*.{json,yml}', 'foo.json']
  }
}
```


Since context is the value of "this", the `metadata` path is not required in templates, only property names:

* `{%= name %}` (e.g. not `{%= metadata.name %}`) => `Foo`
* `{%= description %}` => `This is foo.`



### docs
Type: `String`
Default: `./docs/`

Override the default directory for files included using `{%= _.doc('foo.md') %}`. This defaults to the `./docs` directory in the root of your project.

```js
readme: {
  options: {
    docs: 'foo/'
  }
}
```


### templates
Type: `String`
Default: `./node_modules/phaser/tasks/templates/` (relative to your project)

Override the default `cwd` for files included by using `{%= _.include('foo.md') %}`. By default, the `include` mixin will look for files in `./node_modules/phaser/tasks/templates` directory, where some starter templates are stored. ([Also see examples →](./DOCS.md#examples))

```js
readme: {
  options: {
    templates: 'bar/'
  }
}
```


## remove
Type: `Array`
Default: `grunt|helper|mixin`

Any string defined in the remove will be removed from the content passed in using the `{%= _.shortname() %}` template. Example:

```js
readme: {
  options: {
    remove: ["foo", "bar", "baz"]
  }
}
```

Given a `package.json` with the following property:

```json
{
  "name": "foo-module"
}
```

when referenced in a template like this:

```js
# {%= _.titleize(_.shortname(name)) %}
```

will renders to:

```
# Module
```

## contributing
Type: `Boolean`
Default: `True`

By default, the README task copies a basic `CONTRIBUTING.md` file to the root of your project. If one exists, the task will skip this. If you wish to prevent the task from adding this file to your project, set the `contributing` option to `false`.


## sep
Type: `String`
Default: `\n`

Separator to use between sections of content that is included using the `include` or `doc` filters (more about these in the "filters" section below). This option is more useful when you use [minimatch][] patterns to specify the files to include.

The `sep` option can either be defined in the task options:

```js
readme: {
  options: {
    sep: '\n***\n'
  }
}
```

or as a second parameter in the `include` or `doc` filters.

* `{%= _.include("docs-*.md", "***") %}` (more below...)
* `{%= _.doc("*.md", "\n***\n") %}` (more below...)

[minimatch]: https://github.com/isaacs/minimatch
