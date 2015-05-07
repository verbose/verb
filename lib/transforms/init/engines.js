'use strict';

/**
 * Load built-in engines
 */

module.exports = function(app) {
  app.engine('md', require('engine-lodash'), {
    delims: ['{%', '%}']
  });
};
