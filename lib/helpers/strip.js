'use strict';

/**
 * ```js
 * {%= strip('helper-foo', 'helper') %}
 * //=> 'foo'
 * ```
 */

module.exports = function strip(str, strip) {
  return str.replace(strip, '');
};
