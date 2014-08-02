# API

> Developer documentation for Verb

## [cache.js](../../lib/cache.js)

The Cache constructor. This is Assemble's parent storage class.

* ``obj``: (Object):

## .set( key, value ) Sets a new element by `key`.


* ``key``: (String):
* ``value``: (*):
* ``expand``: (Boolean):

Store a constant.

* `key`: (String):
* `value`: (*):

Check if `value` is enabled (truthy). this.enabled('foo') // => false this.enable('foo') this.enabled('foo') // => true

* `value`: (String):

Check if `value` is disabled. this.'foo') // => true this.enable('foo') this.disabled('foo') // => false

* `value`: (String):

Enable `value`.

* `value`: (String):

Disable `value`.

* `value`: (String):

## .merge ( arguments ) Extend the cache with the given object. This method is chainable. **Example** ```js var cache = new Cache(); cache .merge({foo: 'bar'}, {baz: 'quux'}); .merge({fez: 'bang'}); ```

## .get( key ) Gets the data by key.


* ``key``: (*):
* ``create``: (Boolean):

## .all() Lists all elements.

## .remove( key ) Removes an element by key.


* `key`: (*):

## .omit ( arguments ) Omit properties from the cache. **Example** ```js var cache = new Cache(); cache.set('src', 'foo/'); cache.set('dest', 'bar/'); cache .omit('src'); // or cache .omit('src', 'dest'); // or cache .omit(['src']); // or cache .omit(['src', 'dest']); ```

## .exists( key ) Return true if an element exists. **Example** ```js cache.exists('person'); //=> true ```

* `key`: (String):

## [config.js](../../lib/config.js)

## [data.js](../../lib/data.js)

Extend context with metadata from `options.data`.

* `options`: (Object):

## [event.js](../../lib/event.js)

## [exclusions.js](../../lib/exclusions.js)

Default exclusions
Omit properties from the context

## [file.js](../../lib/file.js)

Expose fs-utils on verb

## [filters.js](../../lib/filters.js)

### [filters](../../lib/filters.js#L12)

Filters Adds `filter` extensions to the context.

* `options`: (Object):

## [columnify.js](../../lib/filters/columnify.js)

## [listify.js](../../lib/utils/listify.js)

## [namify.js](../../lib/filters/namify.js)

## [reverse.js](../../lib/utils/reverse.js)

## [safename.js](../../lib/utils/safename.js)

Strings to strip from the return value.
Safename

* `name`: ([type]): The name to be modified

## [strip.js](../../lib/utils/strip.js)

## [layout.js](../../lib/scaffolds/layout.js)

## [matter.js](../../lib/matter.js)

Use gray-matter to parse and extract YAML, JSON, Coffee or TOML front matter. Also set some defaults.

* `str`: (String): Source string to be parsed by gray-matter.
* `options`: (Object): Options are passed to gray-matter on the `options.matter` property.

## [mixins.js](../../lib/mixins.js)

### [mixins](../../lib/mixins.js#L11)

Export mixins

* `options`: (Object):

## [plugins.js](../../lib/plugins.js)

### [plugins](../../lib/plugins.js#L12)

Plugins Adds `plugin` extensions to the context.

* `options`: (Object):

## [authors.js](../../lib/utils/authors.js)

Parse the AUTHORS file into an array of `author` objects.

* `filepath`: (String): Alternate filepath.

## [contributors.js](../../lib/utils/contributors.js)

## [dotfiles.js](../../lib/plugins/dotfiles.js)

Generate dotfiles from a data file

## [homepage.js](../../lib/plugins/homepage.js)

## [repo.js](../../lib/plugins/repo.js)

## [travis.js](../../lib/plugins/travis.js)

.travis.yml
If `.travis.yml` does not exist, and `travis: true` is defined in the options, then add a `.travis.yml` file to the root of the project.
If `.travis.yml` already exists, add a travis URL to the context for use in templates

## [username.js](../../lib/utils/username.js)

Extract a username/org from a GitHub URL.

* `{String}`: ():

## [scaffolds.js](../../lib/scaffolds.js)

## [comment.js](../../lib/scaffolds/comment.js)

## [html-layout.js](../../lib/scaffolds/html-layout.js)

## [methods.js](../../lib/scaffolds/methods.js)

## [readme-basic.js](../../lib/scaffolds/readme-basic.js)

## [readme-contrib.js](../../lib/scaffolds/readme-contrib.js)

## [tags.js](../../lib/tags.js)

### [tags](../../lib/tags.js#L12)

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

Adjust heading levels. Adds one heading level next to all markdown headings to make them correct within the scope of the inheriting document. Headings in fenced code blocks are skipped.

## [arrayify.js](../../lib/utils/arrayify.js)

## [block.js](../../lib/utils/block.js)

TODO: This isn't used anywhere. Move it to example for delims!
Create a block template

## [condense.js](../../lib/utils/condense.js)

Replace extraneous newlines with a single newline.

* `str`: (String):

## [convertUrl.js](../../lib/utils/convertUrl.js)

## [delims.js](../../lib/utils/delims.js)

Escape / Unescape delimiters. Syntax was changed to mirror Yeoman's, for familiarity to users.

## [dir.js](../../lib/utils/dir.js)

Get the relative path from process.cwd() to the specifiied paths, from any other directory in the project.

## [extendContext.js](../../lib/utils/extendContext.js)

## [extension.js](../../lib/utils/extension.js)

## [index.js](../../lib/utils/index.js)

## [inspect.js](../../lib/utils/inspect.js)

## [isType.js](../../lib/utils/isType.js)

## [lookup.js](../../lib/utils/lookup.js)

Convenience wrapper around `glob.find` and `glob.match`. Expand the given glob patterns, then look for a match in the result set.

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

## function time() Get the current time using `.toLocaleTimeString()`.

## [timestamp.js](../../lib/utils/timestamp.js)

