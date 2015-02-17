'use strict';

var url = require('url');

exports.username = function username(str) {
  var pathname = url.parse(str).pathname;
  var segments = pathname.split('/').filter(Boolean);
  return segments[0];
};

/**
 * Coerce value to an flattened, dense array.
 *
 * @api private
 */

exports.arrayify = function arrayify(val) {
  return Array.isArray(val) ? val : [val];
};
