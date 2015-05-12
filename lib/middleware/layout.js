'use strict';

/**
 * Set the engine to use
 */

module.exports = function engine_(file, next) {
  file.layout = file.layout || file.data.layout || file.options.layout;
  next();
};
