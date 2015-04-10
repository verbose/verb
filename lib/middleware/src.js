'use strict';

var path = require('path');

/**
 * Set properties on `file.data.src` to use in plugins,
 * other middleware, helpers and templates.
 */

module.exports = function src_(file, next) {
  var orig = file.options.originalPath;
  var parsed = path.parse(orig);

  file.data.src = file.data.src || {};

  file.data.src.path = orig;
  file.data.src.dirname = parsed.dir;
  file.data.src.filename = parsed.name;
  file.data.src.basename = parsed.base;
  file.data.src.extname = parsed.ext;
  next();
};
