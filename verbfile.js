'use strict';

var path = require('path');
var utils = require('./lib/utils');

/**
 * HEADS UP: this is not what a normal verfile.js would look like.
 * We're just trying to break everyting right now, so this has a
 * lot of stuff in it.
 */

module.exports = function(verb, base, env) {

  /**
   * Readme task
   */

  verb.task('readme', function(cb) {
    var plugins = verb.get('env.argv.plugins') || verb.plugins;

    // ask pre-configured questions, but only if
    // they don't have answers yet
    verb.toStream('docs', function(key, view) {
      if (view.dest === 'readme.md') {
        // custom `sections` from package.json `verb` config
        var sections = verb.get('cache.sections');
        if (sections) view.content = sections;
        return true;
      }
    })
      .pipe(handle(verb, 'onStream'))
      .on('error', cb)
      .pipe(verb.renderFile('text'))
      .on('error', cb)
      .on('error', utils.handleError(verb))
      .pipe(verb.pipeline(plugins))
      .pipe(handle(verb, 'preWrite'))
      .pipe(verb.dest(rename()))
      .pipe(utils.exhaust(handle(verb, 'postWrite')))
      .on('finish', cb);
  });

  /**
   * Re-write package.json with any user-defined config updates
   */

  verb.task('package', function(cb) {
    verb.toStream('docs', function(key, view) {
      return view.basename === 'package.json';
    })
      .pipe(handle(verb, 'preWrite'))
      .pipe(verb.dest(rename()))
      .pipe(utils.exhaust(handle(verb, 'postWrite')))
      .on('error', cb)
      .on('finish', cb);
  });

  /**
   * Default tasks
   */

  verb.task('default', ['readme', 'package']);
};

/**
 * Handle a middleware stage in the pipeline
 *
 * @param {Object} `app`
 * @param {Object} `stage`
 * @return {Object}
 */

function handle(app, stage) {
  return utils.through.obj(function(file, enc, next) {
    if (file.isNull()) return next();
    if (typeof app.handle !== 'function') {
      return next(null, file);
    }
    app.handle(stage, file, next);
  });
}

/**
 * Rename template files
 */

function rename(dest) {
  return function(file) {
    var fp = file.dest || dest || '';
    file.base = fp ? path.dirname(fp) : file.base;
    file.path = fp;
    file.basename = file.basename.replace(/^_/, '.');
    file.basename = file.basename.replace(/^\$/, '');
    return file.base;
  };
}
