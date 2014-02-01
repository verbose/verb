# phaser

## Options

* defaults
* options

## Config

* package.json | alt config object
* metadata




### metadata
Type: `Object|Array|String`

Default: `undefined`

* `string`: When defined as a string,

### namespace
Type: `Boolean|String`

Default: `undefined` (options: `true`|`"only"`)


When defined, an object is created for each data file, where the top level property on the object is the name of the file itself, and the data contained within the file is extended into that object. [See examples](#namespacing).




## Getting started

### metadata

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

### Extending the Context
For example, let's say we need to extend the context with some data that isn't in our example `package.json`, such as `author.name`. We have a few options:

* Raw `object`|`array` defined directly on the `options.metadata` object
* Front matter in the templates themselves
* JSON / YAML data files, e.g. `foo.json`, `foo.yml` etc.


#### Raw

#### Front Matter

Example:

```markdown
---
username: jonschlinkert
---
Visit [some link](https://github.com/{%= username %}/foo) to learn more!

```

#### Data files

`foo.js`

```json
{
  "author": {
    "name": "Jon Schlinkert",
    "url": "https://github.com/jonschlinkert"
  }
}
```

##### namespacing
Given we have a file named `foo.json` with the following contents:

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
