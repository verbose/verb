'use strict';

/**
 * Get/set the current working directory
 *
 * ```js
 * console.log(verb.cwd);
 * //=> /dev/foo/bar/
 * ```
 * Or set:
 *
 * ```js
 * verb.cwd = 'foo';
 * ```
 */

module.exports = function(app) {
  var cwd = app.option('cwd') || process.cwd();

  Object.defineProperty(app, 'cwd', {
    configurable: true,
    get: function () {
      return cwd;
    },
    set: function (val) {
      cwd = val;
    }
  });
};
