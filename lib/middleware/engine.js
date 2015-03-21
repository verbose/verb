'use strict';

/**
 * Set the engine to use
 */

module.exports = function options_(file, next) {
  file.options.engine = file.options.engine || file.ext || '.md';
  next();
};
