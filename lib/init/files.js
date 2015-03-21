'use strict';

var mm = require('micromatch');
var glob = require('globby');
var utils = require('../utils');

/**
 * Loads files from the root of the current project.
 * Returns matching function bound to the list of files.
 *
 * ```js
 * console.log(verb.files('*.js'));
 * //=> ['foo.js', 'bar.js']
 * ```
 */

module.exports = function files_(verb) {
  var files = glob.sync('*/*', {dot: true});

  verb.files = function (pattern, options) {
    return mm(files, pattern, options);
  };
};
