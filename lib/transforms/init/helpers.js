'use strict';

/**
 * Load default helpers
 */

module.exports = function(app) {
  require('../../helpers/sync')(app);
  require('../../helpers/async')(app);
  require('../../helpers/collections')(app);
};
