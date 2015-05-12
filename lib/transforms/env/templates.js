'use strict';

var path = require('path');

/**
 * Get/set the current working directory
 *
 * ```js
 * console.log(verb.templates);
 * //=> /dev/foo/bar/
 * ```
 * Or set:
 *
 * ```js
 * verb.templates = 'foo';
 * ```
 */

module.exports = function(app) {
  var dir = app.option('templates');
  if (typeof dir === 'undefined') {
    dir = path.join(process.cwd(), 'templates');
  }
  app.set('paths.templates');
};
