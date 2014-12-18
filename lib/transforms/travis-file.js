'use strict';

/**
 * Add data to the context for creating a `.travis.yml`
 * file.
 *
 * To override, do:
 *
 * ```js
 * verb.data({travis: {}});
 * ```
 */

module.exports = function travis(verb) {
  if (!verb.cache.data.hasOwnProperty('travis')) {
    verb.data({travis: {language: "node_js", node_js: ["0.10", "0.11"]}});
  }
};