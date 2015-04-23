'use strict';

/**
 * Create a code example from the contents of the specified
 * JavaScript file.
 *
 * ```js
 * {%%= example("foo", {name: "my-module"}) %}
 * ```
 *
 * @param  {String} `fp` The path of the file to include.
 * @param  {String} `options`
 *   @option {String} `name` Replace `./` in `require('./')` with the given name.
 * @return {String}
 */

module.exports = function example(str, opts) {
  if (typeof str !== 'string') {
    throw new TypeError('example-helper expects a string.');
  }

  opts = opts || {};
  if (opts.name) {
    str = str.split(/\(['"]\.\/['"]\)/).join('(\'' + opts.name + '\')');
  }

  return str;
};
