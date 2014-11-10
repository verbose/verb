<<<<<<< HEAD
/**
 * Coerce the value to an array
 *
 * @param {name} arrayify
 * @param {Array|String} arr
 *
 * @return {Array}
 * @api public
 */

module.exports = function(arr) {
  return !Array.isArray(arr) ? [arr] : arr;
};
=======
'use strict';

/**
 * Coerce value to an flattened, dense array.
 *
 * @api private
 */

module.exports = function (val) {
  return Array.isArray(val) ? val : [val];
};
>>>>>>> github/master
