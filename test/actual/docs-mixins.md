filters use the following formats:

* `_.mixin()`: when used in JavaScript
* `{%= _.mixin() %}`: when used in templates


## "include" filters

> Three different filters are built into the task for including "external" content: `include`, `doc` and `resolve`. Each is used for a different purpose.

Here is a summary of what they do (settings for the `include` and `doc` filters can be customized in the task options):

* `{%= _.include("file.md") %}`: include a file (or files using [minimatch][minimatch] patterns) from the `./templates/` directory of _the phaser task_.
* `{%= _.doc("file.md") %}`:  include a file (or files using [minimatch][minimatch] patterns) from the `./docs/` directory of _your project_.
* `{%= _.resolve("file.md") %}`: include a **specific file** from *node_modules*`.
* `{%= _.contrib("file.md") %}`: include a file (or files using [minimatch][minimatch] patterns) from the `./contrib/` directory of _the phaser task_. This mixin is for the [Assemble](http://assemble.io).


### _.include()
Use the `include` mixin in templates to pull in content from other files:

```js
{%= _.include("examples.md") %}
```

[Minimatch][minimatch] patterns may also be used:

```js
{%= _.include("docs-*.md") %}
```

Unless overridden in the `templates` option, the `include` mixin will use the `./node_modules/phaser/tasks/templates/` directory (from the root of your project) as the `cwd` for templates.


### _.doc()
Same as the `include` mixin but is hard-coded to use the `docs/` folder of your project as the `cwd` for templates.


### _.resolve()
Use the `resolve` mixin in templates to include content _from named NPM modules listed in `devDependencies`_:

```js
{%= _.resolve("my-boilerplate-readme") %}
```

where `my-boilerplate-readme` is the name of a `devDependency` currently installed in `node_modules`.

For the `resolve` mixin to work:

1. The referenced file must be listed in the `devDependencies` of your project's `package.json`,
1. It must be installed in `node_modules`, and
1. The referenced project must have the file defined in the `main` property of that project's `package.json`.
1. Last, in your templates make sure you _use the name of the module, not the name of the file to "include"_.

**example**
In the `package.json` of the project that will store your templates, you might do something like:

```js
{
  "name": "my-boilerplate-readme",
  "main": "README.tmpl.md"
}
```

## convenience filters

### _.meta()

Get the value of any property in `package.json`. Example:

```js
{%= _.meta('name') %}
{%= _.meta('version') %}
{%= _.meta('contributors') %}
{%= _.meta('keywords') %}
```
A second paramter can be passed in to set the indentation on returned JSON: `{%= _.meta('contributors', 4) %}`. _This only works for stringified objects_.

Also, if left undefined (`{%= _.meta() %}`) the mixin will return the entire metadata object (by default, this is the entire contents of `package.json`):

### _.jsdocs()
Parse and extract comments from specified JavaScript files to generate output for each code comment block encountered.

```js
{%= _.jsdocs("tasks/readme.js") %}
```

Currently, only the block is output and a link to the block in the source code is provided. This needs to be updated to only generate the markdown for jsdoc comments and to do something to make them more readable.


### _.copyright()
Add a copyright statement, including the name of the author and the year, or range of years, the copyright is in effect. The primary advantage of using this is to ensure that the copyright dates are correct.

Parameters:

* `Number`: Optionally define the start year of the project.

Examples:

```js
{%= _.copyright() %}
// => Copyright (c) 2013 Jeffrey Herb, contributors.

{%= _.copyright('2011') %}
// => Copyright (c) 2011-2013 Jeffrey Herb, contributors.
```


### _.license()
Add a "license statement" to the README, using the license(s) specified in package.json. If you maintain a number of projects, some of which might have more than one license, while others only have one, you can use the `_.license()` mixin to automate the process of adding license info.

Examples:

```js
{%= _.license() %}
```
> Released under the MIT license

Customize the output:

```js
{%= _.license('Licensed under the ') %}
```
> Licensed under the MIT license


### _.contributors()
Render contributors listed in the project's package.json.


### _.username()
Extract the username or org from URLs in the project's package.json. The mixin will extract the username from the `homepage` property if it exists. If not, it will try to extract the username from the `git.url` property.


### _.homepage()
Extract the homepage URL from the project's package.json. If a `homepage` property doesn't exist, the mixin will create a `homepage` URL using the value defined in the `git.url` property.

[minimatch]: https://github.com/isaacs/minimatch
