'use strict';

var path = require('path');
var reflinks = require('./reflinks');
var utils = require('./utils');

/**
 * Format a markdown file using [pretty-remarkable][]. Optionally
 * specify a `--dest` directory and/or file `--name`.
 *
 * ```sh
 * $ verb --format foo/bar.md
 * ```
 * @name --format
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
      .pipe(utils.format())
      .pipe(app.dest(function(file) {
        file.basename = (config.name || path.basename(filepath));
        return (config.dest || path.resolve(path.dirname(filepath)));
      }))
      .on('error', next)
      .on('end', next);
  };
};
