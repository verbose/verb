# Comments 

## [config.js](lib/config.js)


Initialize config object. This defaults to package.json, unless overridden by passing an object to `options.config`

* `config`: (Object):      

## [data.js](lib/data.js)


Extend context with metadata from `options.data`.

* `options`: (Object):      

## [exclusions.js](lib/exclusions.js)


Default exclusions
  

Omit properties from the context
   

## [file.js](lib/file.js)


Export `phaser.file`
  

Expand files.

* `src`: (String):   
* `options`: (Object):     

Expand files and read in content.

* `src`: (String):   
* `options`: (Object):     

Expand mapping

* `expandMapping`: (name):   
* `patterns`: (Array|String): Accepts either comma separated globbing patterns or an array of globbing patterns.  
* `dest`: (String): The base path for dest files.  
* `options`: (Object): Options to pass in: @option {String} cwd: the current working directory for source files. @option {String} ext: the file extension to use on dest files.     

## [filters.js](lib/filters.js)


Adds filters to the context

* `options`: (Object):      

## [authors.js](lib/utils/authors.js)
 

## [badge.js](lib/filters/badge.js)
 

## [boilerplates.js](lib/filters/boilerplates.js)
 

## [comments.js](lib/filters/comments.js)
 

## [contrib.js](lib/filters/contrib.js)
 

## [copyright.js](lib/filters/copyright.js)
 

## [date.js](lib/utils/date.js)


Date functions used in _.date() filter

* `dateobj`: (Object): The date object to format.  
* `pattern`: (String): The pattern to use, e.g. 'YYYY-MM-DD'.     

## [docs.js](lib/filters/docs.js)
 

## [include.js](lib/filters/include.js)
 

## [license.js](lib/filters/license.js)
 

## [log.js](lib/log.js)
 

## [partial.js](lib/filters/partial.js)
 

## [pkg.js](lib/filters/pkg.js)
 

## [reverse.js](lib/utils/reverse.js)


Reverse a string

* `str`: (String): The string to reverse     

## [safename.js](lib/filters/safename.js)
 

## [shortname.js](lib/filters/shortname.js)
 

## [strip.js](lib/utils/strip.js)


Strip newlines and whitespace padding.

* `str`: (String): The string to reverse     

## [toc.js](lib/utils/toc.js)


Generate a Table of Contents.

* `str`: (String):   
* `options`: (Object):      

## [index.js](lib/utils/index.js)
 

## [matter.js](lib/matter.js)


Parse and extract YAML, JSON or Coffee front matter.
   

## [mixins.js](lib/mixins.js)


Adds mixins to the context

* `options`: (Object):      

## [homepage.js](lib/plugins/homepage.js)
 

## [partials.js](lib/partials.js)
 

## [plugins.js](lib/plugins.js)


Register plugins with Phaser

* `options`: (Object):      

## [template.js](lib/template.js)


Compile Lo-Dash templates.

* `str`: (String): The templates to process.  
* `data`: (Object): Context for the templates  
* `settings`: (Object): Options to pass to Lo-Dash     

## [adjust.js](lib/utils/adjust.js)


Adjust heading levels. Adds one heading level next to all markdown headings to make them correct within the scope of the inheriting document. Headings in fenced code blocks are skipped.
  

Unescapes delimiters
   

## [arrayify.js](lib/utils/arrayify.js)


Coerce the value to an array

* `arrayify`: (name):   
* `arr`: (Array|String):      

## [block.js](lib/utils/block.js)
 

## [contributors.js](lib/utils/contributors.js)
 

## [convertUrl.js](lib/utils/convertUrl.js)
 

## [dir.js](lib/utils/dir.js)


Get the relative path from process.cwd() to the specifiied paths, from any other directory in the project.
   

## [expandData.js](lib/utils/expandData.js)


Read in data from a string, object or array

* `data`: (String|Object|Array): String, object or array  
* `options`: (Object): Pass an object of options     

## [isType.js](lib/utils/isType.js)


Returns the `typeOf` a JavaScript value
   

## [postProcess.js](lib/utils/postProcess.js)


Post-process content with RegExp replacement patterns

* `str`: (String): The string with patterns to replace.  
* `options`: (Object): The options to use @option {patterns} Replacement patterns to use     

## [time.js](lib/utils/time.js)


## function time() Get the current time using `.toLocaleTimeString()`.
   

## [timestamp.js](lib/utils/timestamp.js)
 

## [username.js](lib/utils/username.js)


Extract a username/org from a GitHub URL.

* `{String}`: ():      