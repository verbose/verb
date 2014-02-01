Example document:

```js
# {%= name %}

> {%= description %}

{%= toc %}

## Overview
{%= _.doc("overview.md") %}

## Options
{%= _.doc("options.md") %}

## Examples
{%= _.doc("examples.md") %}

## License and Copyright
{%= copyright %}
{%= license %}
```

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install phaser --save-dev
```

_The plugin must be listed in the `devDependencies` of your project.js package.json to be recognized by Assemble!_.

Once that's done, just add `phaser`, the name of this module, to the `plugins` option in the Assemble task:


```js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    assemble: {
      options: {
        plugins: ['phaser'],
        function (name, userDefined) {
    var remove = _.unique(_.flatten(_.union(sanitize, userDefined || [])));
    var re = new RegExp('^(?:' + remove.join('|') + ')[-_]?');
    return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
  }: {
          // plugin options
        }
      },
      ...
    }
  });
  grunt.loadNpmTasks('assemble');
  grunt.registerTask('default', ['assemble']);
};
```

If everything was installed and configured correctly, you should be ready to go!
