'use strict';

/**
 * Create a template expression to be used in logging/debugging
 * messages.
 *
 * ```js
 * makeTag('foo', 'bar');
 * //=> '{{foo "bar"}}'
 *
 * makeTag('foo', 'bar', ['<%=', '%>']);
 * //=> '<%= foo("bar") %>'
 * ```
 *
 * @param  {String} `name`
 * @param  {String} `key`
 * @param  {Array} `delims` Optionally pass custom delimiters.
 * @return {String}
 */

module.exports = function makeTag_(name, key, delims) {
  return inner[(delims && delims[0]) || '{{'](name, key);
};

var inner = {
  '{%=': function (name, key) {
    return expression(name, key, '{%=', '%}');
  },
  '<%=': function (name, key) {
    return expression(name, key, '<%=', '%>');
  },
  '{{': function (name, key) {
    return expression(name, key, '{{', '}}');
  }
};

function expression(name, key, lt, rt) {
  return lt + name + (key ? ' "' + key + '"' : '') + rt;
}
