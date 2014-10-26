'use strict';

var _ = require('lodash');

/**
 * Convenience method for debugging vinyl file objects
 * without the `contents` property.
 *
 * @api private
 */

module.exports = function(obj) {
  var o = _.omit(obj, ['contents', '_contents', 'orig']);
  return JSON.stringify(o, null, 2);
};
