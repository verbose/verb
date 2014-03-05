# API

> Developer documentation for Phaser

## [colors.js](../../lib/colors.js)

## [config.js](../../lib/config.js)

Initialize config object. This defaults to
package.json, unless overridden by passing
an object to `options.config`

* `config`: (Object):

## [data.js](../../lib/data.js)

Extend context with metadata from
`options.data`.

* `options`: (Object):

## [exclusions.js](../../lib/exclusions.js)

Default exclusions
Omit properties from the context

## [file.js](../../lib/file.js)

### [expand](../../lib/file.js#L17)

Expand files.

* `src`: (String):
* `options`: (Object):

### [read](../../lib/file.js#L41)

Read files.

* `src`: (String):
* `options`: (Object):

Expand mapping

* `expandMapping`: (name):
* `patterns`: (Array

String): Accepts either comma separated globbing patterns or an array of globbing patterns.

* `dest`: (String): The base path for dest files.
* `options`: (Object): Options to pass in: @option {String} cwd: the current working directory for source files. @option {String} ext: the file extension to use on dest files.

## [filters.js](../../lib/filters.js)

### [filters](../../lib/filters.js#L15)

Adds filters to the context

* `options`: (Object):

Built-in filters
User-defined

## [columnify.js](../../lib/filters/columnify.js)

## [listify.js](../../lib/utils/listify.js)

Flatten an array and convert it
to a comma-separated list.

* `arr`: (Array): [description]

## [reverse.js](../../lib/utils/reverse.js)

### [reverse](../../lib/utils/reverse.js#L11)

Reverse a string

* `str`: (String): The string to reverse

## [safename.js](../../lib/utils/safename.js)

Safename

* `name`: ([type]): The name to be modified

## [shortname.js](../../lib/filters/shortname.js)

## [strip.js](../../lib/utils/strip.js)

### [reverse](../../lib/utils/strip.js#L11)

Strip newlines and whitespace padding.

* `str`: (String): The string to reverse

## [layout.js](../../lib/layout.js)

Default layout to use when one isn't
defined in the options.
Load layouts

## [log.js](../../lib/tags/log.js)

## [matter.js](../../lib/matter.js)

Parse and extract YAML, JSON or Coffee
front matter.

## [mixins.js](../../lib/mixins.js)

### [mixins](../../lib/mixins.js#L11)

Export mixins

* `options`: (Object):

## [partials.js](../../lib/partials.js)

### [partials](../../lib/partials.js#L20)

Define individual partials.

### [partials](../../lib/partials.js#L50)

Register partials as strings. Use `options.partials`
to add partials. Globbing patterns may be used.

## [plugins.js](../../lib/plugins.js)

### [plugins](../../lib/plugins.js#L15)

Adds plugins to the context

* `options`: (Object):

Run built-in plugins
Run user-defined plugins

## [contributors.js](../../lib/utils/contributors.js)

## [example.js](../../lib/plugins/example.js)

## [homepage.js](../../lib/plugins/homepage.js)

## [ignore.js](../../lib/plugins/ignore.js)

gitignore
If `gitignore` does not exist, and `gitignore: true` is
defined in the options, then add a `gitignore`
file to the root of the project. This is a command
line convenience.

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

## [gitignore.js](../../lib/scaffolds/gitignore.js)

## [html-layout.js](../../lib/scaffolds/html-layout.js)

## [readme-basic.js](../../lib/scaffolds/readme-basic.js)

## [readme-contrib.js](../../lib/scaffolds/readme-contrib.js)

## [tags.js](../../lib/tags.js)

### [tags](../../lib/tags.js#L16)

Adds tags to the context

* `options`: (Object):

Initialize tags

* `phaser`: (Object):

Built-in tags
User-defined

## [authors.js](../../lib/utils/authors.js)

## [badge.js](../../lib/tags/badge.js)

Status, analytics and version badges.

* `config`: (Object):
* `options`: (Object):

## [boilerplates.js](../../lib/tags/boilerplates.js)

### [boilerplate](../../lib/tags/boilerplates.js#L19)

Boilerplates are used to kickstart new projects.
Using the API, you can pre-define a boilerplate
to use when a new project is initialized.

* `config`: (Object):
* `options`: (Object):

## [changelog.js](../../lib/tags/changelog.js)

## [comments.js](../../lib/tags/comments.js)

## [contrib.js](../../lib/tags/contrib.js)

## [copyright.js](../../lib/tags/copyright.js)

Add a copyright statement, with author and year(s) in effect.

* `startYear`: (Number): Optional parameter to define the start year of the project.

## [date.js](../../lib/utils/date.js)

### [formatDate](../../lib/utils/date.js#L10)

Date functions used in _.date() filter

* `dateobj`: (Object): The date object to format.
* `structure`: (String): The structure to use, e.g. 'YYYY-MM-DD'.

## [dates.js](../../lib/tags/dates.js)

### [formatDate](../../lib/tags/dates.js#L11)

Date functions used in _.date() filter

* `dateobj`: (Object): The date object to format.
* `structure`: (String): The structure to use, e.g. 'YYYY-MM-DD'.

## [docs.js](../../lib/tags/docs.js)

## [getAuthors.js](../../lib/tags/getAuthors.js)

## [html.js](../../lib/tags/html.js)

## [include.js](../../lib/tags/include.js)

## [license.js](../../lib/tags/license.js)

## [moment.js](../../lib/tags/moment.js)

## [partial.js](../../lib/tags/partial.js)

## [pkg.js](../../lib/tags/pkg.js)

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

Adjust heading levels. Adds one heading
level next to all markdown headings to
make them correct within the scope of the
inheriting document. Headings in fenced
code blocks are skipped.
Unescapes delimiters

## [arrayify.js](../../lib/utils/arrayify.js)

Coerce the value to an array

* `arrayify`: (name):
* `arr`: (Array

String):

## [block.js](../../lib/utils/block.js)

TODO: This isn't used anywhere.
Move it to example for delims!
Create a block template

## [condense.js](../../lib/utils/condense.js)

Remove all extraneous newlines.

* `str`: (String):

## [convertUrl.js](../../lib/utils/convertUrl.js)

## [dir.js](../../lib/utils/dir.js)

Get the relative path from process.cwd() to
the specifiied paths, from any other directory
in the project.

## [expandData.js](../../lib/utils/expandData.js)

### [expandData](../../lib/utils/expandData.js#L19)

Read in data from a string, object or array

* `data`: (String,Object,Array): String, object or array
* `options`: (Object): Pass an object of options

## [extendContext.js](../../lib/utils/extendContext.js)

## [index.js](../../lib/utils/index.js)

## [inspect.js](../../lib/utils/inspect.js)

## [isType.js](../../lib/utils/isType.js)

Returns the `typeOf` a JavaScript value

## [lookup.js](../../lib/utils/lookup.js)

## [md.js](../../lib/utils/md.js)

Format markdown, adjusts whitespace.

* `str`: (String):

## [postProcess.js](../../lib/utils/postProcess.js)

Post-process content with RegExp replacement patterns

* `str`: (String): The string with patterns to replace.
* `options`: (Object): The options to use @option {patterns} Replacement patterns to use

## [rollcall.js](../../lib/utils/rollcall.js)

## [time.js](../../lib/utils/time.js)

## function time()

Get the current time using `.toLocaleTimeString()`.

## [timestamp.js](../../lib/utils/timestamp.js)

### [function timetamp()](../../lib/utils/timestamp.js#L9)

Get the current time using `.toISOString()`
