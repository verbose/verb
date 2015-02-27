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

module.exports = function travisFile(verb) {
  if (!verb.hasData('travis')) {
    verb.data({
      travis: {
        sudo: false,
        language: 'node_js',
        node_js:  ['iojs', '0.12', '0.10']
      }
    });
  }
  // verb.ifKnown('set', 'data.travis', {
  //   sudo: false,
  //   language: 'node_js',
  //   node_js:  ['iojs', '0.12', '0.10']
  // });
};
