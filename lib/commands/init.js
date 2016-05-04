'use strict';

var debug = require('debug')('base:cli:init');
var questions = require('../questions');
var utils = require('../utils');

/**
 * Initialize a prompt session and persist the answers to the `verb` object
 * in the package.json in the current working directory.
 *
 * ```sh
 * $ --init
 * ```
 * @name --init
 * @api public
 */

module.exports = function(app, base, options) {
  return function(val, key, config, next) {
    init(app, {save: false}, function(err, answers) {
      if (err) return next(err);
      app.set('cache.initKeys', Object.keys(answers.config));
      app.cli.process(answers, next);
    });
  };
};

function init(app, options, cb) {
  if (typeof app.questions === 'undefined') {
    cb(new Error('expected base-questions plugin to be defined'));
    return;
  }

  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  options = utils.extend({}, options, app.options);

  questions(app, options);
  app.questions.disable('save');

  app.ask('init.choose', function(err, answers) {
    if (err) return cb(err);

    debug('finished with init.choose "%j"', answers);

    var plugins = arrayify(app, utils.get(answers, 'config.plugins'));
    if (plugins.length) {
      app.ask('after', { save: false }, function(err, res) {
        if (err) return cb(err);

        var answer = utils.get(res, 'after.plugins');
        if (answer === true) {
          app.pkg.save();
          app.npm.saveDev(plugins, function(err) {
            if (err) return cb(err);
            app.pkg.queued = true;
            cb(null, answers);
          });
        } else {
          cb(null, answers);
        }
      });
    } else {
      cb(null, answers);
    }
  });
};

function arrayify(app, val) {
  if (!val) return [];
  if (typeof val === 'string') {
    return val.split(',');
  }

  var deps = app.pkg.get('devDependencies') || {};
  var len = val.length;
  var idx = -1;
  var res = [];

  while (++idx < len) {
    var dep = val[idx];
    if (dep && !deps.hasOwnProperty(dep)) {
      res.push(dep);
    }
  }
  return res;
}
