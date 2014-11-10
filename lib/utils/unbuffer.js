'use strict';

/**
 * Un-buffer the contents of a template.
 *
 * @api private
 */

module.exports = function unBuffer(value) {
  if (value == null) {
    return {};
  }

  if (!Buffer.isBuffer(value.contents)) {
    return value;
  }

  value.content = value.contents.toString('utf8');
  var o = {};

  for (var key in value) {
    if (['contents', '_contents'].indexOf(key) === -1) {
      o[key] = value[key];
    }
  }
  return o;
};
