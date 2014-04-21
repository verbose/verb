# BASIC

> A project without documentation is like a project that doesn't exist. Verb solves this by making it dead simple to generate docs, using simple markdown templates, with zero configuration required.

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
BOOM A project without documentation is like a project that doesn't exist. Verb solves this by making it dead simple to generate docs, using simple markdown templates, with zero configuration required.
{{/block}},## Release History

> Changelog using default 'CHANGELOG' file. See 'examples/changelog.js'

**DATE**       **VERSION**   **CHANGES**                                                        
* 2014-03-29   v0.2.0        Changes the delimiter escaping format to be similar to Yeoman.,Adds
                             documentation. Fixes and adds tests for front matter.              
* 2014-03-10   v0.1.0        First commmit.                                                     

> Changelog using custom data source

**DATE**       **VERSION**   **CHANGES**         
* 2020-03-11   v0.2.0        9 billionth commmit.,# API

> Developer documentation for Verb

## [colors.js](../../lib/colors.js)

## [config.js](../../lib/config.js)

## [data.js](../../lib/data.js)

Extend context with metadata from
`options.data`.

* `options`: (Object):

## [exclusions.js](../../lib/exclusions.js)

Default exclusions
Omit properties from the context

## [filters.js](../../lib/filters.js)

### [filters](../../lib/filters.js#L13)

Adds filters to the context

* `options`: (Object):

## [columnify.js](../../lib/filters/columnify.js)

## [listify.js](../../lib/utils/listify.js)

## [reverse.js](../../lib/utils/reverse.js)

## [safename.js](../../lib/utils/safename.js)

Strings to strip from the return value.
Safename

* `name`: ([type]): The name to be modified

## [strip.js](../../lib/utils/strip.js)

## [layout.js](../../lib/scaffolds/layout.js)

## [matter.js](../../lib/matter.js)

Parse and extract YAML, JSON or Coffee
front matter.

## [mixins.js](../../lib/mixins.js)

### [mixins](../../lib/mixins.js#L11)

Export mixins

* `options`: (Object):

## [plugins.js](../../lib/plugins.js)

### [plugins](../../lib/plugins.js#L6)

Plugins

* `options`: (Object):

## [authors.js](../../lib/utils/authors.js)

Parse the AUTHORS file into an array of `author` objects.

* `filepath`: (String): Alternate filepath.

## [contributors.js](../../lib/utils/contributors.js)

## [homepage.js](../../lib/plugins/homepage.js)

## [repo.js](../../lib/plugins/repo.js)

## [travis.js](../../lib/plugins/travis.js)

.travis.yml
If `.travis.yml` does not exist, and
`travis: true` is defined in the options,
then add a `.travis.yml` file to the root
of the project.
If `.travis.yml` already exists, add
a travis URL to the context for use
in templates

## [username.js](../../lib/utils/username.js)

Extract a username/org from a
GitHub URL.

* `{String}`: ():

## [scaffolds.js](../../lib/scaffolds.js)

## [comment.js](../../lib/scaffolds/comment.js)

## [gitignore.js](../../lib/scaffolds/gitignore.js)

## [html-layout.js](../../lib/scaffolds/html-layout.js)

## [methods.js](../../lib/tags/methods.js)

## [readme-basic.js](../../lib/scaffolds/readme-basic.js)

## [readme-contrib.js](../../lib/scaffolds/readme-contrib.js)

## [tags.js](../../lib/tags.js)

### [tags](../../lib/tags.js#L13)

Adds tags to the context

* `options`: (Object):

## [badge.js](../../lib/tags/badge.js)

Status, analytics and version badges.

* `context`: (Object):
* `options`: (Object):

## [changelog.js](../../lib/tags/changelog.js)

## [comments.js](../../lib/tags/comments.js)

## [contrib.js](../../lib/tags/contrib.js)

## [copyright.js](../../lib/tags/copyright.js)

Add a copyright statement, with author and year(s) in effect.

* `startYear`: (Number): Optional parameter to define the start year of the project.

## [date.js](../../lib/utils/date.js)

## [dates.js](../../lib/tags/dates.js)

## [docs.js](../../lib/tags/docs.js)

## [getAuthors.js](../../lib/tags/getAuthors.js)

## [html.js](../../lib/tags/html.js)

## [include.js](../../lib/tags/include.js)

## [license.js](../../lib/tags/license.js)

## [log.js](../../lib/tags/log.js)

## [moment.js](../../lib/tags/moment.js)

## [nl.js](../../lib/tags/nl.js)

## [toc.js](../../lib/utils/toc.js)

Generate a Table of Contents.

* `str`: (String):
* `options`: (Object):

## [template.js](../../lib/template.js)

Compile Lo-Dash templates.

* `str`: (String): The templates to process.
* `data`: (Object): Context for the templates
* `settings`: (Object): Options to pass to Lo-Dash

## [adjust.js](../../lib/utils/adjust.js)

Adjust heading levels. Adds one heading level next
to all markdown headings to make them correct within
the scope of the inheriting document. Headings in
fenced code blocks are skipped.

## [arrayify.js](../../lib/utils/arrayify.js)

## [block.js](../../lib/utils/block.js)

TODO: This isn't used anywhere.
Move it to example for delims!
Create a block template

## [condense.js](../../lib/utils/condense.js)

Replace extraneous newlines with a single newline.

* `str`: (String):

## [convertUrl.js](../../lib/utils/convertUrl.js)

## [delims.js](../../lib/utils/delims.js)

Escape / Unescape delimiters. Syntax was changed
to mirror Yeoman's, for familiarity to users.

## [dir.js](../../lib/utils/dir.js)

Get the relative path from process.cwd() to
the specifiied paths, from any other directory
in the project.

## [extendContext.js](../../lib/utils/extendContext.js)

## [index.js](../../lib/utils/index.js)

## [inspect.js](../../lib/utils/inspect.js)

## [isType.js](../../lib/utils/isType.js)

## [lookup.js](../../lib/utils/lookup.js)

Convenience wrapper around `glob.find` and `glob.match`.
Expand the given glob patterns, then look for a match
in the result set.

* `patterns`: (String): The glob patterns to expand.
* `name`: (String): The name to match in the result set.

## [matchname.js](../../lib/utils/matchname.js)

## [md.js](../../lib/utils/md.js)

Format markdown, adjusts whitespace.

* `str`: (String):

## [postProcess.js](../../lib/utils/postProcess.js)

Post-process content with RegExp replacement patterns

* `str`: (String): The string with patterns to replace.
* `options`: (Object): The options to use @option {patterns} Replacement patterns to use

## [resolveMatches.js](../../lib/utils/resolveMatches.js)

Resolve matches.

* `name`: ([type]): [description]
* `filepath`: ([type]): [description]

## [rollcall.js](../../lib/utils/rollcall.js)

## [time.js](../../lib/utils/time.js)

## function time()

Get the current time using `.toLocaleTimeString()`.

## [timestamp.js](../../lib/utils/timestamp.js)

,# verb

> A project without documentation is like a project that doesn't exist. Verb solves this by making it dead simple to generate docs, using simple markdown templates, with zero configuration required.

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

_This file was generated by [Verb](https://github.com/assemble/verb) on April 21, 2014._,examples/html/layout.html,## base
Type: `undefined`

Default: `undefined`

## config
Type: `undefined`

Default: `undefined`

## copy
Type: `undefined`

Default: `undefined`

## cwd
Type: `undefined`

Default: `undefined`

## data
Type: `undefined`

Default: `undefined`

## exclusions
Type: `undefined`

Default: `undefined`

## expand
Type: `undefined`

Default: `undefined`

## filters
Type: `undefined`

Default: `undefined`

## init
Type: `undefined`

Default: `undefined`

## layout
Type: `undefined`

Default: `undefined`

## log
Type: `undefined`

Default: `undefined`

## matter
Type: `undefined`

Default: `undefined`

## parse
Type: `undefined`

Default: `undefined`

## plugins
Type: `undefined`

Default: `undefined`

## process
Type: `undefined`

Default: `undefined`

## read
Type: `undefined`

Default: `undefined`

## tags
Type: `undefined`

Default: `undefined`

## template
Type: `undefined`

Default: `undefined`

,## Release History

 * v0.2.0   2014-04-21   Changes the delimiter escaping format to be similar to Yeoman. Adds documentation. Fixes and adds tests for front matter.
 * v0.1.0   2014-04-21   First commmit.
,## Release History

 * 2014-04-21   v0.2.0   Changes the delimiter escaping format to be similar to Yeoman. Adds documentation. Fixes and adds tests for front matter.
 * 2014-04-21   v0.1.0   First commmit.