'use strict';

/**
 * Prime `file.data.dest`. The rest of the path logic for
 * `dest` is handled in the pipeline by the `dest` plugin.
 */

module.exports = function dest_(file, next) {
  file.data.dest = file.data.dest || {};
  next();
};
