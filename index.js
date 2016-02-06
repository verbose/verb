/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var async = require('async');
var debug = require('debug')('verb');
var util = require('generator-util');
var Assemble = require('assemble-core');
var settings = require('./lib/settings');
var plugins = require('./lib/plugins');
var config = require('./lib/config');
var utils = require('./lib/utils');

/**
 * Create an instance of `Verb` with the given `options`
 *
 * ```js
 * var Verb = require('verb');
 * var verb = new Verb();
 * ```
 * @param {Object} `options` Settings to initialize with.
 * @api public
 */

function Verb(options) {
  if (!(this instanceof Verb)) {
    return new Verb(options);
  }
  this.options = utils.extend({}, this.options, options);
  Assemble.call(this, options);
  this.is('Verb');
  this.initVerb(this.options);
}

/**
 * Extend `Assemble`
 */

Assemble.extend(Verb);

/**
 * Initialize verb defaults
 */

Verb.prototype.initVerb = function(opts) {
  this.configfile = opts.configfile || 'verbfile.js';
  this.prefix = opts.prefix || 'verb-generate';

  this.data({runner: require('./package')});
  this.initPlugins(this.options);

  this.create('files');
  this.create('docs');
  this.define('util', utils);
  this.define('lazyCreate', function(name, opts) {
    if (!this[name]) this.create(name, opts);
  });

  var plugin = this.plugin;
  this.define('plugin', function(name) {
    var pipeline = this.options.pipeline;
    if (arguments.length === 1 && pipeline) {
      var idx = pipeline.indexOf(name);
      if (idx !== -1) {
        pipeline.splice(idx, 1);
      }
    }
    return plugin.apply(this, arguments);
  });
};

/**
 * Initialize verb plugins
 */

Verb.prototype.initPlugins = function(opts) {
  this.use(plugins.generators({prefix: 'verb-generate'}));
  this.use(plugins.pipeline());
  this.use(plugins.loader());
  this.use(plugins.runner());
  this.use(plugins.rename({replace: true}));
  this.use(plugins.ask());
  this.use(settings());
  this.use(config());

  if (opts.cli === true || process.env.VERB_CLI) {

    // modify create, dest and src methods to automatically
    // use cwd from generators unless overridden by the user
    util.create(this);
    util.dest(this);
    util.src(this);
  }
};

Verb.prototype.conflicts = function(patterns, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  this.overwrite = false;
  var app = this;

  // function overwrite(filename, cb) {
  //   var msg = filename + ' already exists. Do you want to overwrite it?';
  //   app.questions.set('conflict', msg, { save: false });

  //   app.ask('conflict', function(err, answers) {

  //   });
  // }

  var views = this.collection();

  utils.glob(patterns, options, function(err, files) {
    if (err) return cb(err);

    async.each(files, function(fp, next) {
      views.addView(fp);
      next();
    }, function(err) {
      if (err) {
        cb(err);
      } else {
        cb(null, views);
      }
    });
  });
};

/**
 * Expose static `is*` methods from Templates
 */

Assemble._.plugin.is(Verb);

/**
 * Expose `Verb`
 */

module.exports = Verb;
