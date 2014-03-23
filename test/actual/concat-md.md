# BASIC

> Verb makes it easy to build project documentation using simple markdown templates, with zero configuration required.

* [Example "README" template](#example-readme-template)


## Example "README" template

## {%= name %}

> {%= description %}

### Getting started
Install with [npm](npmjs.org) `npm i -g {%= name %} --save-dev`

### Options
{%= docs("options") %}

### Examples
{%= docs("examples") %}

### Author
+ {%= author.name %}

### License
{%= copyright() %}
{%= license() %},,{{block custom}}
BOOM Verb makes it easy to build project documentation using simple markdown templates, with zero configuration required.
{{/block}},## Release History

> Changelog using default 'CHANGELOG' file. See 'examples/changelog.js'

**DATE**       **VERSION**   **CHANGES**   
* 2014-03-10   v0.1.0        First commmit.

> Changelog using custom data source

**DATE**       **VERSION**   **CHANGES**         
* 2020-03-11   v0.2.0        9 billionth commmit.,# API

> Developer documentation for Verb

## [colors.js](lib/colors.js)

## [config.js](lib/config.js)

Initialize user-config object. Unless overridden by passing
an object to `options.config`, this defaults to the
package.json of the user's current, local project,

* `config`: (Object):

## [data.js](lib/data.js)

Extend context with metadata from
`options.data`.

* `options`: (Object):

## [exclusions.js](lib/exclusions.js)

Default exclusions
Omit properties from the context

## [file.js](lib/file.js)

### [expand](lib/file.js#L17)

Expand files.

* `src`: (String):
* `options`: (Object):

### [read](lib/file.js#L41)

Read files.

* `src`: (String):
* `options`: (Object):

Expand mapping

* `expandMapping`: (name):
* `patterns`: (Array

String): Accepts either comma separated globbing patterns or an array of globbing patterns.

* `dest`: (String): The base path for dest files.
* `options`: (Object): Options to pass in: @option {String} cwd: the current working directory for source files. @option {String} ext: the file extension to use on dest files.

## [filters.js](lib/filters.js)

### [filters](lib/filters.js#L14)

Adds filters to the context

* `options`: (Object):

Built-in filters
User-defined

## [columnify.js](lib/filters/columnify.js)

## [listify.js](lib/utils/listify.js)

Flatten an array and convert it
to a comma-separated list.

* `arr`: (Array): [description]

## [reverse.js](lib/utils/reverse.js)

### [reverse](lib/utils/reverse.js#L11)

Reverse a string

* `str`: (String): The string to reverse

## [safename.js](lib/utils/safename.js)

Strings to strip from the return value.
Safename

* `name`: ([type]): The name to be modified

## [shortname.js](lib/filters/shortname.js)

## [strip.js](lib/utils/strip.js)

### [reverse](lib/utils/strip.js#L11)

Strip newlines and whitespace padding.

* `str`: (String): The string to reverse

## [layout.js](lib/scaffolds/layout.js)

## [log.js](lib/tags/log.js)

## [matter.js](lib/matter.js)

Parse and extract YAML, JSON or Coffee
front matter.

## [mixins.js](lib/mixins.js)

### [mixins](lib/mixins.js#L11)

Export mixins

* `options`: (Object):

## [plugins.js](lib/plugins.js)

### [plugins](lib/plugins.js#L13)

Adds plugins to the context

* `options`: (Object):

Run built-in plugins
Run user-defined

## [contributors.js](lib/utils/contributors.js)

## [homepage.js](lib/plugins/homepage.js)

## [repo.js](lib/plugins/repo.js)

## [travis.js](lib/plugins/travis.js)

.travis.yml
If `.travis.yml` does not exist, and
`travis: true` is defined in the options,
then add a `.travis.yml` file to the root
of the project.
If `.travis.yml` already exists, add
a travis URL to the context for use
in templates

## [username.js](lib/utils/username.js)

Extract a username/org from a
GitHub URL.

* `{String}`: ():

## [scaffolds.js](lib/scaffolds.js)

## [comment.js](lib/scaffolds/comment.js)

## [gitignore.js](lib/scaffolds/gitignore.js)

## [html-layout.js](lib/scaffolds/html-layout.js)

## [methods.js](lib/tags/methods.js)

## [readme-basic.js](lib/scaffolds/readme-basic.js)

## [readme-contrib.js](lib/scaffolds/readme-contrib.js)

## [tags.js](lib/tags.js)

### [tags](lib/tags.js#L15)

Adds tags to the context

* `options`: (Object):

Initialize tags

* `verb`: (Object):

Built-in tags
User-defined

## [authors.js](lib/utils/authors.js)

## [badge.js](lib/tags/badge.js)

Status, analytics and version badges.

* `context`: (Object):
* `options`: (Object):

## [changelog.js](lib/tags/changelog.js)

## [comments.js](lib/tags/comments.js)

## [contrib.js](lib/tags/contrib.js)

## [copyright.js](lib/tags/copyright.js)

Add a copyright statement, with author and year(s) in effect.

* `startYear`: (Number): Optional parameter to define the start year of the project.

## [date.js](lib/utils/date.js)

### [formatDate](lib/utils/date.js#L10)

Date functions used in _.date() filter

* `dateobj`: (Object): The date object to format.
* `structure`: (String): The structure to use, e.g. 'YYYY-MM-DD'.

## [dates.js](lib/tags/dates.js)

### [formatDate](lib/tags/dates.js#L11)

Date functions used in _.date() filter

* `dateobj`: (Object): The date object to format.
* `structure`: (String): The structure to use, e.g. 'YYYY-MM-DD'.

## [docs.js](lib/tags/docs.js)

## [getAuthors.js](lib/tags/getAuthors.js)

## [html.js](lib/tags/html.js)

## [include.js](lib/tags/include.js)

## [license.js](lib/tags/license.js)

## [moment.js](lib/tags/moment.js)

## [toc.js](lib/utils/toc.js)

Generate a Table of Contents.

* `str`: (String):
* `options`: (Object):

## [template.js](lib/template.js)

Compile Lo-Dash templates.

* `str`: (String): The templates to process.
* `data`: (Object): Context for the templates
* `settings`: (Object): Options to pass to Lo-Dash

## [adjust.js](lib/utils/adjust.js)

Adjust heading levels. Adds one heading
level next to all markdown headings to
make them correct within the scope of the
inheriting document. Headings in fenced
code blocks are skipped.
Unescapes delimiters

## [arrayify.js](lib/utils/arrayify.js)

Coerce the value to an array

* `arrayify`: (name):
* `arr`: (Array

String):

## [block.js](lib/utils/block.js)

TODO: This isn't used anywhere.
Move it to example for delims!
Create a block template

## [condense.js](lib/utils/condense.js)

Remove all extraneous newlines.

* `str`: (String):

## [convertUrl.js](lib/utils/convertUrl.js)

## [dir.js](lib/utils/dir.js)

Get the relative path from process.cwd() to
the specifiied paths, from any other directory
in the project.

## [expandData.js](lib/utils/expandData.js)

### [expandData](lib/utils/expandData.js#L19)

Read in data from a string, object or array

* `data`: (String,Object,Array): String, object or array
* `options`: (Object): Pass an object of options

## [extendContext.js](lib/utils/extendContext.js)

## [index.js](lib/utils/index.js)

## [inspect.js](lib/utils/inspect.js)

## [isType.js](lib/utils/isType.js)

Returns the `typeOf` a JavaScript value

## [lookup.js](lib/utils/lookup.js)

Convenience wrapper around `glob.find` and `glob.match`.
Expand the given glob patterns, then look for a match
in the result set.

* `patterns`: (String): The glob patterns to expand.
* `name`: (String): The name to match in the result set.

## [matchname.js](lib/utils/matchname.js)

## [md.js](lib/utils/md.js)

Format markdown, adjusts whitespace.

* `str`: (String):

## [postProcess.js](lib/utils/postProcess.js)

Post-process content with RegExp replacement patterns

* `str`: (String): The string with patterns to replace.
* `options`: (Object): The options to use @option {patterns} Replacement patterns to use

## [resolveMatches.js](lib/utils/resolveMatches.js)

Resolve matches.

* `name`: ([type]): [description]
* `filepath`: ([type]): [description]

## [rollcall.js](lib/utils/rollcall.js)

## [time.js](lib/utils/time.js)

## function time()

Get the current time using `.toLocaleTimeString()`.

## [timestamp.js](lib/utils/timestamp.js)

### [function timetamp()](lib/utils/timestamp.js#L9)

Get the current time using `.toISOString()`
,# verb

> Verb makes it easy to build project documentation using simple markdown templates, with zero configuration required.

Exactly like the one on Star Trek. But instead of "stun" and "kill", this Verb generates markdown documentation, making it hands-down the most deadly markdown documentation generator on the planet (and probably others ones too).

Please [report any bugs or feature requests](https://github.com/assemble/verb/issues/new), thanks!

## Install
<!-- docs('install') -->

## Contribute
<!-- docs('contribute') -->

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [Verb](https://github.com/assemble/verb) on March 23, 2014._,examples/html/layout.html,## API

> Verb methods

### base
Type: `undefined`

Default: `undefined`

### copy
Type: `undefined`

Default: `undefined`

### cwd
Type: `undefined`

Default: `undefined`

### exclusions
Type: `undefined`

Default: `undefined`

### expand
Type: `undefined`

Default: `undefined`

### init
Type: `undefined`

Default: `undefined`

### layout
Type: `undefined`

Default: `undefined`

### log
Type: `undefined`

Default: `undefined`

### process
Type: `undefined`

Default: `undefined`

### read
Type: `undefined`

Default: `undefined`

### template
Type: `undefined`

Default: `undefined`

,## Release History

 * v0.1.0   2014-03-23   First commmit.
,## Release History

 * 2014-03-23   v0.1.0   First commmit.