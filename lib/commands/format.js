'use strict';

var reflinks = require('../reflinks');
var format = require('gulp-format-md');
var path = require('path');

/**
 * Format a markdown file using [pretty-remarkable][].
 *
 * ```sh
 * $ verb --format foo/bar.md
 * ```
 * @name --file
 * @api public
 */

module.exports = function(app, options) {
  return function(filepath, key, config, next) {
    if (!filepath || typeof filepath !== 'string') {
      next();
      return;
    }

    app.src(path.resolve(filepath))
      .pipe(reflinks(app))
      .pipe(format())
      .pipe(app.dest(function(file) {
        file.basename = (config.name || path.basename(filepath));
        return (config.dest || path.resolve(path.dirname(filepath)));
      }))
      .on('error', next)
      .on('end', next);
  };
};
