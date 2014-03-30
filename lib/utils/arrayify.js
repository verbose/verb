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