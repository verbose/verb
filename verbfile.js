'use strict';

var path = require('path');
var utils = require('./lib/utils');
var defaults = require('./lib/runner/defaults');
var argv = require('minimist')(process.argv.slice(2), {
  alias: {v: 'verbose'}
});

module.exports = function(verb, base, env) {
  if (argv.init) {
    verb.questions.options.forceAll = true;
  }

  var tasks = verb.get('env.argv.tasks') || ['readme'];

  /**
   * Readme task
   */

  verb.task('readme', function(cb) {
    var plugins = verb.get('env.argv.plugins') || verb.plugins;

    // load package.json data and user options onto `verb.cache.data`
    verb.data({options: verb.options});
    verb.data(env.user.pkg);
    verb.data({license: 'Released under the MIT license.'});

    // ask pre-configured questions, but only if they don't have
    // answers yet
    verb.ask(function(err, answers) {
      if (err) {
        cb(err);
        return;
      }

      verb.toStream('docs', function(key) {
          return key === '.verb';
        })
        .pipe(handle('onStream'))
        .pipe(verb.renderFile('text', answers))
        .on('error', handleError(verb))
        .pipe(verb.pipeline(plugins))
        .pipe(handle('preWrite'))
        .pipe(verb.dest(dest('readme.md')))
        .pipe(utils.exhaust(handle('postWrite')))
        .on('error', cb)
        .on('finish', cb);
    });
  });

  verb.task('docs', function(cb) {
    verb.ask(function(err, answers) {
      if (err) return cb(err);

      verb.toStream('docs')
        .on('error', cb)
        .pipe(verb.renderFile('text', answers))
        .on('error', cb)
        .pipe(verb.dest(dest('readme.md')))
        .on('finish', cb);
    });
  });

  verb.register('store', function(app, base) {
    app.task('del', function(cb) {
      verb.store.del({force: true});
      console.log('deleted store.');
      cb();
    });
  });

  verb.task('default', tasks);

  function handle(stage) {
    return utils.through.obj(function(file, enc, next) {
      if (file.isNull()) return next();
      verb.handle(stage, file, next);
    });
  }
};

/**
 * Rename template files
 */

function dest(dest) {
  return function(file) {
    file.base = path.dirname(dest);
    file.path = dest;
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
      msg = err.message + ': "' + m[1] + '()" is defined as a helper\n'
       + 'in `.verb.md`, but "' + m[1] + '" is defined on '
       + 'verb.cache.data as a "' + typeof app.cache.data[m[1]] + '"';
    }
    if (app.options.verbose) {
      console.log(msg);
      console.log(err.stack);
    } else {
      console.log(err.message);
      console.log(msg);
    }
    process.exit(1);
  }
}
