'use strict';

/**
 * Return true if `key` is an own, enumerable property
 * of the given `obj`.
 *
 * ```js
 * hasOwn(obj, key);
 * ```
 *
 * @param  {Object} `obj` The object to check.
 * @param  {String} `key`
 * @return {Boolean}
 * @api private
 */

module.exports = function hasOwn(o, key) {
  return {}.hasOwnProperty.call(o, key);
};
