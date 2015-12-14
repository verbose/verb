'use strict';

var path = require('path');
var utils = require('./lib/utils');
var data = require('./lib/runner/data');
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    v: 'verbose'
  }
});

/**
 * !HEADS UP: this is not what a normal verfile.js would look like.
 * We're just trying to break everyting right now, so this has a
 * lot of stuff in it.
 */

module.exports = function(verb, base, env) {
  if (argv.init) {
    verb.questions.options.forceAll = true;
  }

  var tasks = verb.get('env.argv.tasks') || ['readme', 'package'];

  verb.task('a', function(cb) {
    console.log('verb base > a');
    cb();
  });
  verb.task('b', function(cb) {
    console.log('verb base > b');
    cb();
  });
  verb.task('c', function(cb) {
    console.log('verb base > c');
    cb();
  });

  /**
   * Readme task
   */

  verb.task('readme', function(cb) {
    var plugins = verb.get('env.argv.plugins') || verb.plugins;
    data.updateData(verb, verb.base, verb.env);

    // ask pre-configured questions, but only if
    // they don't have answers yet
    verb.ask(function(err, answers) {
      if (err) return cb(err);

      verb.toStream('docs', function(key, view) {
        return key === '.verb';
      })
        .pipe(handle(verb, 'onStream'))
        .pipe(verb.renderFile('text', answers))
        .on('error', handleError(verb))
        .pipe(verb.pipeline(plugins))
        .pipe(handle(verb, 'preWrite'))
        .pipe(verb.dest(dest()))
        .pipe(utils.exhaust(handle(verb, 'postWrite')))
        .on('error', cb)
        .on('finish', cb);
    });
  });

  verb.task('package', function(cb) {
    verb.toStream('docs', function(key, view) {
      return view.basename === 'package.json';
    })
      .pipe(handle(verb, 'preWrite'))
      .pipe(verb.dest(dest()))
      .pipe(utils.exhaust(handle(verb, 'postWrite')))
      .on('error', cb)
      .on('finish', cb);
  });

  verb.task('default', tasks);
};

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

function dest(dest) {
  return function(file) {
    var fp = file.dest || dest || '';
    file.base = fp ? path.dirname(fp) : file.base;
    file.path = fp;
    file.basename = file.basename.replace(/^_/, '.');
    file.basename = file.basename.replace(/^\$/, '');
    return file.base;
  };
}

/**
 * Handle render errors
 */

function handleError(app) {
  return function(err, cb) {
    var m = /(\w+) is not a function/.exec(err.message);
    var msg = '';
    if (m) {
      msg = err.message + ': "' + m[1] + '()" is defined as a helper\n' + 'in `.verb.md`, but "' + m[1] + '" is defined on ' + 'verb.cache.data as a "' + typeof app.cache.data[m[1]] + '"';
    }
    if (app.options.verbose) {
      console.log(msg);
      console.log(err.stack);
    } else {
      console.log(err.message);
      console.log(msg);
    }
    process.exit(1);
  };
}
