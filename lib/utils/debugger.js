'use strict';

var omit = require('object.omit');

/**
 * Convenience method for debugging vinyl file objects
 * without the `contents` property.
 *
 * @api private
 */

module.exports = function(obj) {
  var o = omit(obj, ['contents', '_contents', 'orig']);
  return JSON.stringify(o, null, 2);
};
