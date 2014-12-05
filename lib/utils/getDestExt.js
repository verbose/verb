'use strict';

/**
 * Return the destination extension for the given `file`.
 *
 * @param {Object} `file` A file object with `ext`/`dest` properties.
 * @api public
 */

module.exports = function getDestExt(file) {
  if (file.dest == null) {
    return this.option('destExt');
  }
  return file.ext || file.dest.ext || this.option('destExt');
};
