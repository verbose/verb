'use strict';

/**
 * Coerce value to an flattened, dense array.
 *
 * @api private
 */

module.exports = function (val) {
  return Array.isArray(val) ? val : [val];
};
