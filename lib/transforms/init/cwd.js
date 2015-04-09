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

module.exports = function cwd_(verb) {
  var cwd = verb.option('cwd') || process.cwd();

  Object.defineProperty(verb, 'cwd', {
    get: function () {
      return cwd;
    },
    set: function (val) {
      cwd = val;
    }
  });
};
