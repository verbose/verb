# Documentation

**Table of Contents**
* [Overview](#overview)
* [Advanced configuration](#advanced-configuration)
* [Features](#features)
* [Options](#options)
* [Mixins](#mixins)
* [Examples](#examples)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)


## Overview
In general, the conventions used by this task are as follows:

**Templates**
* Files with extension `.tmpl.md` are generally templates that will be compiled one-to-one into documents
* Files with extension `.md` are generally intended to be used as includes.
* `{%= _.doc("foo") %}` is used to included files from your project's `./docs` directory
* `{%= _.include("foo") %}` is used to include boilerplate files from phaser

## Advanced configuration
To change the plugin's defaults, add a section to your project's Gruntfile named `function (name, options) {
    var opts = _.extend({}, options);
    if(opts.blacklist === false) {blacklist = [];}
    var exclusions = _.union(blacklist, utils.arrayify(options.omit));
    var re = new RegExp('^(?:' + exclusions.join('|') + ')[-_]?', 'g');
    return name.replace(re, '');
  }` to the data object passed into `grunt.initConfig()`:

```js
grunt.initConfig({
  // The "repos" task
  repos: {
    options: {}
  },

  // The "readme" task
  readme: {
    options: {
      metadata: {}
    }
  }
});
grunt.loadNpmTasks('phaser');
grunt.registerTask('default', ['readme']);
```

## Features
### templates

### Readme template

* `docs/`
* `node_modules/grunt-readme/templates/`
* `options.readme`
* `options.resolve.readme`


### YAML Front Matter
Add YAML front matter to documents to extend the metadata that is supplied to your project's templates.

```yaml
---
username: jonschlinkert
---
```

## Options
### Overview of available options

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

## Mixins
Mixins use the following formats:

* `_.mixin()`: when used in JavaScript
* `{%= _.mixin() %}`: when used in templates


### "include" mixins

> Three different mixins are built into the task for including "external" content: `include`, `doc` and `resolve`. Each is used for a different purpose.

Here is a summary of what they do (settings for the `include` and `doc` mixins can be customized in the task options):

* `{%= _.include("file.md") %}`: include a file (or files using [minimatch][minimatch] patterns) from the `./templates/` directory of _the phaser task_.
* `{%= _.doc("file.md") %}`:  include a file (or files using [minimatch][minimatch] patterns) from the `./docs/` directory of _your project_.
* `{%= _.resolve("file.md") %}`: include a **specific file** from *node_modules*`.
* `{%= _.contrib("file.md") %}`: include a file (or files using [minimatch][minimatch] patterns) from the `./contrib/` directory of _the phaser task_. This mixin is for the [Assemble](http://assemble.io).


#### _.include()
Use the `include` mixin in templates to pull in content from other files:

```js
{%= _.include("examples.md") %}
```

## Examples
## Template Examples

> Copy/paste any of these examples into your templates as a starting point.


### Name

```js
{%= name %}
```

## Contributing
Find a bug? Have a feature request? Please [create an Issue](https://github.com/jonschlinkert/phaser/issues).

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][], and build the documentation with [grunt-readme](https://github.com/assemble/grunt-readme).

Pull requests are also encouraged, and if you find this project useful please consider "starring" it to show your support! Thanks!

## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license

***

