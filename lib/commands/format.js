'use strict';

var format = require('gulp-format-md');
var path = require('path');

/**
 * Format the given file.
 *
 * ```sh
 * $ verb --format foo/bar.md
 * ```
 * @cli public
 */

module.exports = function(app, options) {
  return function(file, key, config, next) {
    app.src(path.resolve(file))
      .pipe(format())
      .pipe(app.dest(path.resolve(path.dirname(file))))
      .on('error', next)
      .on('end', next);
  };
};
