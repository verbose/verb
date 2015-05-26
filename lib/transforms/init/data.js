'use strict';

var path = require('path');
var utils = require('../../utils');

/**
 * Prime `verb.cache.data` with empty package.json fields that
 * will be over-written by the user's environment.
 */

module.exports = function(app) {
  app.data('../../pkg.json', function (fp) {
    return utils.tryRequire(path.resolve(__dirname, fp)) || {};
  });
};
