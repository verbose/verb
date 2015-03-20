'use strict';

var helper = require('../helper');

/**
 * Load default helpers
 */

module.exports = function helpers_(verb) {
  require('../helpers/sync')(verb);
  require('../helpers/async')(verb);
  require('../helpers/collections')(verb);
};
