'use strict';

/**
 * Detect the layout to use
 */

module.exports = function(file, next) {
  file.layout = file.layout
    || file.data.layout
    || file.locals.layout
    || file.options.layout;
  next();
};
