'use strict';

/**
 * Default data to be used for creating `.travis.yml`
 * files. This is overridden by passing a `travis` object
 * to `cache.data`:
 *
 * ```js
 * verb.data({travis: {}});
 * ```
 *
 * @param  {Object} `app` Current instance of verb
 */

module.exports = function(app) {
  var data = app.cache.data;

  try {
    if (!data.hasOwnProperty('travis')) {
      app.data({
        travis: {
          language: "node_js",
          node_js: ["0.10", "0.11"]
        }
      });
    }
  } catch(err) {
    console.log(err);
  }
};