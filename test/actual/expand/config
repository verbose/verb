* package.json | alt config object
* metadata

## metadata

Unless overridden in the options, Phaser will attempt to process templates using only the data from your project's [package.json](./package.json). Thus, using only the default settings our context might look something like this:

```js
{
  "name": "phaser",
  "description": "Documentation generator. Build docs from markdown, Lo-Dash templates, includes, and YAML front matter.",
  "version": "0.1.0",
  "homepge": "https://github.com/jonschlinkert/phaser",
  "dependencies": {
    "fs-utils": "~0.1.11",
    "gray-matter": "~0.2.3",
    "findup-sync": "~0.1.2",
    "frep": "~0.1.3",
    "globule": "~0.2.0",
    "lodash": "~2.4.1",
    "marked-toc": "~0.1.5",
    "template": "~0.1.3"
  },
  // continued...
}
```

For the majority of projects, this will be enough. _But Phaser gives you as much flexibility as you need to extend the context._


# Context

Your project's [package.json](./package.json) will be used as the default config object, which is passed as context to templates. If no other config object is passed to the `config` option, and no metadata is passed in through other means, then this is the context that will be used to process your templates.

## Overriding default config
As mentioned in the previous section, the default config object, `package.json`, can be explicitly overridden by passing an object to `options.config`. Example:

```js
// Raw object
phaser(str, {config: {name: 'foo'}});

// String (filepath)
phaser(str, {config: 'path/to/*.json'});
```

## Extending the Context
From least specific to most specific, this is how the context is extended. In other words, the **last wins**:

* `filters|functions`: [Lo-Dash filters]() and custom functions may be used to build up the context when other more conventional means aren't available. For example, an `authors()` mixin/function might be used to read the [AUTHORS](./AUTHORS) file, and then extend the context with the names of the authors therein.
* `options`: Variables defined directly on the `options` object, e.g. `{name: "phaser"}`.
* `options.data`: Variables from the `options.data` property. This is a very flexible property:
  - `Object`: You may pass a raw object directly to the property, e.g. `{data: {name: "phaser"}}`.
  - `String`If you pass a string, Phaser will try to require it. If that doesn't work, Phaser will try to read it in.
  - Minimatch (glob) patterns may be used, and with either JSON or YAML files, e.g. `{data: 'foo/bar/**/*.{json,yml}'}`
* `metadata`: Front matter



For example, let's say we need to extend the context with some data that isn't in our example `package.json`, such as `author.name`. We have a few options:

* `options.data`: Define a raw `object`|`array` directly on the `options.data` object.
* Front matter in the templates themselves
* JSON / YAML data files, e.g. `foo.json`, `foo.yml` etc.

## options.config vs options.data
Although the options are similar, they serve a different purpose:

* `options.config`: overrides the default config object, so **no data** from `package.json` will be used as the context.
* `options.data`: extend the config object, so **both** data from `package.json` and from `options.data` will be used to extend the context.


### Raw

Example:

```js
options: {
  author: {
    name: "Jon Schlinkert",
    url: "https://github.com/jonschlinkert"
  }
}
```

### Front Matter

Example:

```markdown
---
username: jonschlinkert
---
Visit [some link](https://github.com/{%= username %}/foo) to learn more!

```

### Data files

`foo.json, bar/baz/*.json`

```json
{
  "author": {
    "name": "Jon Schlinkert",
    "url": "https://github.com/jonschlinkert"
  }
}
```

#### namespacing
Given we have a file named `author.json` with the following contents:

**namespace: false**

```json
{
  "author": {
    "name": "Jon Schlinkert",
    "url": "https://github.com/jonschlinkert"
  }
}
```

**namespace: true**
The following object would be merged into the context:

```json
{
  "author": {
    "name": "Jon Schlinkert",
    "url": "https://github.com/jonschlinkert"
  }
}
```