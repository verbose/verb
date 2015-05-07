'use strict';

/**
 * Prime `file.data.dest`. The rest of the path logic for
 * `dest` is handled in the pipeline by the `dest` plugin.
 */

module.exports = function(file, next) {
  if (!file.hasOwnProperty('data')) {
    throw new Error('dest middleware: file object should have a `data` property.');
  }
  file.data.dest = file.data.dest || {};
  next();
};
