'use strict';

/**
 * Default data to be used for creating `.travis.yml`
 * files. This is overridden by passing a `travis` object
 * to `verb.data()`:
 *
 * ```js
 * verb.data({travis: {}});
 *
 * // get the data
 * verb.get('data.travis');
 * ```
 *
 * @param  {Object} `verb` Current instance of verb
 */

module.exports = function travis(verb) {
  if (!verb.hasData('travis')) {
    verb.set('data.travis', {
      sudo: false,
      language: "node_js",
      node_js: ["iojs", "0.10", "0.11"]
    });
  }
};
