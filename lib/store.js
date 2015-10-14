'use strict';

var utils = require('./utils');

/**
 * Expose Locals
 */

module.exports = function (app) {
  app.store = utils.store('verb', app.options.store);
};
