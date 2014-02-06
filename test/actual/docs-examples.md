# Template Examples

> Copy/paste any of these examples into your templates as a starting point.


## Name

```js
{%= name %}
```
> phaser


## Version

```js
{%= version %}
v{%= version %}
{%= version ? " v" + version : "" %}
{%= version ? " * @version " + version + "\\n" : "" %}
```
> 0.1.3
> v0.1.3
> v0.1.3
> * @version 0.1.3\n

## Description

```js
{%= description %}
{%= description ? " * " + description + "\\n" : "" %}
```
> Generate your README from a template. If you already use Grunt, this is a no brainer.
> * Generate your README from a template. If you already use Grunt, this is a no brainer.\n



## Homepage

```js
{%= homepage ? " | " + homepage : "" %}
{%= homepage ? " * " + homepage + "\n" : "" %}
{%= homepage ? " * @docs " + homepage + "\\n" : "" %}
```
>  | https://github.com/assemble/phaser
> * https://github.com/assemble/phaser
>
>  * @docs https://github.com/assemble/phaser\n



## AUTHORS

[AUTHORS](NPM https://npmjs.org/doc/json.html)

> If there is an `AUTHORS` file in the root of your package, npm will treat each line as a `Name <email> (url)` format, where email and url are optional. Lines which start with a # or are blank, will be ignored. **[-- NPM]((NPM https://npmjs.org/doc/json.html)**

To use `author` data from `package.json`:

```js
[{%= author.name %}]({%= author.url %})
```
> [Jon schlinkert](http://github.com/jonschlinkert)

```js
{%= author.name ? " * @author " + author.name + "\\n" : "" %}
{%= author.url ? " * @link " + author.url + "\\n" : "" %}
```
>  * @author Jon Schlinkert\n
>  * @link https://github.com/jonschlinkert\n

Or, if you prefer to use an `AUTHORS` file in the root of the project:

```js
[{%= authors[0].name %}]({%= authors[0].url %})
```
> [Jon schlinkert](http://github.com/jonschlinkert)
> [Brian Woodward](http://github.com/doowb)


## Time and date

```js
{%= grunt.template.today() %}
```
> Tue Sep 17 2013 18:38:42

```js
{%= grunt.template.today("yyyy") %}
```
> 2013

```js
{%= grunt.template.today("yyyy-mm-dd") %}
```
> 2013-09-17

```js
_This file was generated on {%= grunt.template.date("fullDate") %}._
```
> _This file was generated on Monday, September 30, 2013._


## Banner

```js
/*!
 * {%= name %} v{%= version %},  {%= grunt.template.today("yyyy-mm-dd") %}
 * {%= homepage %}
 * Copyright (c) {%= grunt.template.today("yyyy") %} {%= author %}, contributors.
 * {%= _.license() %}.
 */
```

> /*!
 * phaser v0.1.3,  2013-09-22
 * https://github.com/assemble/phaser
 * Copyright (c) 2013 [object Object], contributors.
 * Released under the MIT license.
 */

## Changelog / Release History

```js
{%= _.include("docs-changelog.md") %}
```

> * 2013-09-21   **v0.1.3**   Completely refactored. Adds a lot of documentation.
 * 2013-09-19   **v0.1.0**   First commmit.


Or:

```js
 * {%= grunt.template.today('yyyy') %}   v0.1.0   First commit
```
> * 2013   v0.1.0   First commit



## License

```
{%= _.license() %}
```
> Released under the [MIT license](./LICENSE-MIT).



## Contributors

```js
{%= _.contributors() %}
```
> Jon Schlinkert
> Brian Woodward


## Metadata

You can mix and match formats in the `metadata` option, all of the following shoulw work:

```js
grunt.initConfig({
  pkg: 'package.json',
  foo: 'package.json',
  bar: grunt.file.readJSON('package.json'),
  qux: grunt.file.readJSON('test/fixtures/data/one.json'),
  baz: ['<%= bar %>'],

  config: {
    one: 'test/fixtures/data/one.json',
    two: 'test/fixtures/data/two.yml',
    three: 'test/fixtures/data/three.json',
    pkg: grunt.file.readJSON('package.json'),
    qux: grunt.file.readJSON('test/fixtures/data/one.json')
  },


  // Obviously you can't have duplicate properties on an
  // object, so this is just for illustrative purposes
  // The point is.. you can get just about as crazy as you want.
  readme: {
    options: {
      metadata: ['<%= pkg %>', '<%= qux %>'],
      metadata: ['<%= config.pkg %>', '<%= config.qux %>'],
      metadata: ['<%= pkg %>', {foo: 'bar'}],
      metadata: ['<%= pkg %>', 'test/fixtures/data/*.{json,yml}'],
      metadata: '<%= config.one %>',
      metadata: 'test/fixtures/data/one.json',
      metadata: ['test/fixtures/data/one.json', 'test/fixtures/data/two.yml'],
      metadata: ['test/fixtures/data/two.yml', {description: 'Foo', name: 'Bar'}, '<%= pkg %>', 'test/fixtures/data/*.json', {alpha: 1, beta: 2 }, {kappa: 3, gamma: 4 }, {zed: {orange: 5, apple: 6 } }, '<%= config.one %>', {name: 'New'}, {quux: '<%= qux %>'}, ['one', {pkg: '<%= config.pkg %>'}, 'three'], {arr: ['one', 'two', 'three']}],
      metadata: ['<%= config.one %>', '<%= config.two %>'], metadata: 'test/fixtures/data/*.{json,yml}',
      metadata: ['test/fixtures/data/*.{json,yml}'],
      metadata: ['test/fixtures/data/*.json', 'test/fixtures/data/*.yml'],
      metadata: ['test/fixtures/data/*.json', '<%= config.two %>'],
      metadata: {
        description: 'Foo',
        name: 'Bar'
      }
    }
  }
}
```