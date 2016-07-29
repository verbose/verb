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
    prompt(app, next);
  };
};

function prompt(app, next) {
  ask(app, {save: false}, function(err, answers) {
    if (err) {
      next(err);
      return;
    }
    var config = (answers && answers.config) || {};
    app.set('cache.initKeys', Object.keys(config));
    app.cli.process(answers, next);
  });
}

function ask(app, options, cb) {
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

  app.ask('init.choose', { save: false }, function(err, answers) {
    if (err) return cb(err);
    debug('finished with init.choose "%j"', answers);
    postInit(app, answers, cb);
  });
};

function postInit(app, answers, cb) {
  var plugins = filter(app, utils.get(answers, 'config.plugins'));
  if (!plugins.length) {
    cb(null, answers);

  } else {
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
  }
}

function filter(app, val) {
  if (!val) return [];
  if (typeof val === 'string') {
    val = val.split(',');
  }

  var devDeps = app.pkg.get('devDependencies') || {};
  var deps = app.pkg.get('dependencies') || {};
  var len = val.length;
  var idx = -1;
  var res = [];

  while (++idx < len) {
    var dep = val[idx];
    if (dep && !devDeps.hasOwnProperty(dep) && !deps.hasOwnProperty(dep)) {
      res.push(dep);
    }
  }
  return res;
}

/**
 * Expose methods
 */

module.exports.postInit = postInit;
module.exports.prompt = prompt;
