'use strict';

/**
 * ```js
 * {%= strip('helper-foo', 'helper') %}
 * //=> 'foo'
 * ```
 */

module.exports = function(str, strip) {
  return str.replace(strip, '');
};
