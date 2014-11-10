'use strict';

/**
 * Return true if `key` is an own, enumerable property
 * of `this.cache` or the given `obj`.
 *
 * ```js
 * hasOwn(obj, key);
 * ```
 *
 * @param  {String} `key`
 * @param  {Object} `obj` Optionally pass an object to check.
 * @return {Boolean}
 * @api private
 */

module.exports = function hasOwn(o, key) {
  return {}.hasOwnProperty.call(o, key);
};
