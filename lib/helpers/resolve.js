'use strict';

var resolve = require('helper-resolve');

/**
 * Return a property from the package.json of the specified module.
 * _(The module must be installed in `node_modules`)_.
 *
 * ```js
 * {%%= resolve("micromatch") %}
 * //=> 'node_modules/micromatch/index.js'
 *
 * {%%= resolve("micromatch", "version") %}
 * //=> '2.2.0'
 * ```
 *
 * @param  {String} `fp` The path of the file to include.
 * @param  {String} `options`
 *   @option {String} `name` Replace `./` in `require('./')` with the given name.
 * @return {String}
 */

module.exports = function resolve_(name, key) {
  return resolve.sync(name)[typeof key === 'string' ? key : 'main'];
};
