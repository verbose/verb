/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var async = require('async');
var debug = require('debug')('base:verb');
var Assemble = require('assemble-core');
var plugins = require('./lib/plugins');
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
  this.is('Verb');
  this.name = 'verb';
  this.configfile = opts.configfile || 'verbfile.js';
  this.prefix = opts.prefix || 'verb-generate';

  this.data({runner: require('./package')});
  this.data({verb: {related: {}, reflinks: []}});
  this.initPlugins(this.options);

  this.create('files');
  this.create('docs');
  this.define('util', utils);
  this.define('lazyCreate', function(name, opts) {
    if (!this[name]) this.create(name, opts);
  });

  var plugin = this.plugin;
  this.define('plugin', function(name) {
    var pipeline = this.options.pipeline || [];
    if (arguments.length === 1 && pipeline.length) {
      var idx = pipeline.indexOf(name);
      if (idx !== -1) {
        pipeline.splice(idx, 1);
      }
    } else if (!~pipeline.indexOf(name)) {
      pipeline.push(name);
    }
    plugin.apply(this, arguments);
    return this;
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

  if (opts.cli === true || process.env.VERB_CLI) {
    this.use(plugins.runtimes(opts));

    // modify create, dest and src methods to automatically
    // use cwd from generators unless overridden by the user
    this.use(utils.create());
    utils.dest(this);
    utils.src(this);
  }
};

/**
 * Expose static `is*` methods from Templates
 */

Assemble._.plugin.is(Verb);

/**
 * Expose `Verb`
 */

module.exports = Verb;
