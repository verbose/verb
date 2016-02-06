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
  this.initPlugins();

  this.create('files');
  this.create('docs');
  this.define('util', utils);
  this.define('lazyCreate', function(name, opts) {
    if (!this[name]) this.create(name, opts);
  });
};

/**
 * Initialize verb plugins
 */

Verb.prototype.initPlugins = function() {
  this.use(plugins.generators({prefix: 'verb-generate'}));
  this.use(plugins.pipeline());
  this.use(plugins.loader());
  this.use(plugins.runner());
  this.use(plugins.rename({replace: true}));
  this.use(plugins.ask());
  this.use(settings());
  this.use(config());
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
 * Expose `Verb`
 */

module.exports = Verb;
