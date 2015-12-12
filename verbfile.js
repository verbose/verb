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

  var tasks = verb.get('env.argv.tasks') || ['readme', 'package'];

  /**
   * Readme task
   */

  verb.task('readme', function(cb) {
    verb.questions.enqueue('author', 'name', 'description');

    var plugins = verb.get('env.argv.plugins') || verb.plugins;
    var pkg = env.user.pkg;
    var config = pkg.verb || {};

    verb.option(config.options || {});

    // load package.json data and user options onto `verb.cache.data`
    verb.data({options: verb.options});
    verb.data(pkg);
    verb.data(verb.base.get('cache.expanded'));
    verb.data({license: license(pkg, verb.options)});

    // ask pre-configured questions, but only if
    // they don't have answers yet
    verb.ask(function(err, answers) {
      if (err) return cb(err);

      // placeholder for something better
      verb.emit('info', 'plugins',  Object.keys(plugins).join(', '));

      verb.toStream('docs', function(key) {
          return key === '.verb';
        })
        .pipe(handle('onStream'))
        .pipe(verb.renderFile('text', answers))
        .on('error', handleError(verb))
        .pipe(verb.pipeline(plugins))
        .pipe(handle('preWrite'))
        .pipe(verb.dest(dest()))
        .pipe(utils.exhaust(handle('postWrite')))
        .on('error', cb)
        .on('finish', cb);
    });
  });

  verb.task('package', function(cb) {
    verb.toStream('docs', function(key, view) {
        return view.basename === 'package.json';
      })
      .pipe(handle('preWrite'))
      .pipe(verb.dest(dest()))
      .pipe(utils.exhaust(handle('postWrite')))
      .on('error', cb)
      .on('finish', cb);
  });

  verb.task('verbmd', function(cb) {
    verb.ask(function(err, answers) {
      if (err) return cb(err);

      verb.toStream('docs', function(key) {
          return key === 'min';
        })
        .pipe(verb.dest(dest('.verb.md')))
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
        .pipe(verb.dest(dest()))
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
    var fp = file.dest || dest || '';
    file.base = fp ? path.dirname(fp) : file.base;
    file.path = fp;
    file.basename = file.basename.replace(/^_/, '.');
    file.basename = file.basename.replace(/^\$/, '');
    return file.base;
  };
}

/**
 * Format license
 */

function license(pkg, options) {
  options = options || {};
  if (typeof options.license === 'string') {
    return options.license;
  }
  var str = pkg.license;
  if (Array.isArray(pkg.licenses)) {
    str = pkg.licenses[0];
  }
  if (typeof str === 'undefined') {
    return '';
  }
  return 'Released under the ' + str + ' license.';
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
