'use strict';

var mm = require('micromatch');
var glob = require('globby');

/**
 * Loads files from the root of the current project.
 * Returns matching function bound to the list of files.
 *
 * ```js
 * console.log(verb.files('*.js'));
 * //=> ['foo.js', 'bar.js']
 * ```
 */

module.exports = function(verb) {
  var patterns = ['*', 'lib/*', 'test/*'];
  var files = glob.sync(patterns, {dot: true});

  verb.files = function (pattern, options) {
    return mm(files, pattern, options);
  };

  verb.fileExists = function (pattern, options) {
    var res = verb.files(pattern, options);
    return !!(res && res.length);
  };
};
