/*!
 * verb <https://github.com/jonschlinkert/verb>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * module dependencies
 */

var cli = require('base-cli');
var store = require('base-store');
var config = require('base-config');
var loader = require('assemble-loader');
var Core = require('assemble-core');
var ask = require('assemble-ask');
var minimist = require('minimist');
var expand = require('expand-args');
var rimraf = require('rimraf');
var create = require('./lib/create');
var locals = require('./lib/locals');
var utils = require('./lib/utils');

/**
 * Create a `verb` application. This is the main function exported
 * by the verb module.
 *
 * ```js
 * var verb = require('verb');
 * var app = verb();
 * ```
 * @param {Object} `options` Optionally pass default options to use.
 * @api public
 */

function Verb(options) {
  if (!(this instanceof Verb)) {
    return new Verb(options);
  }

  this.options = utils.extend({reload: false}, options);
  Core.call(this, this.options);
  this.define('isVerb', true);
  this.name = 'verb';

  var argv = minimist(process.argv.slice(2));
  if (process.argv.length > 3) {
    argv = expand(argv);
  }

  this.set('argv', this.argv || argv);
  this.set('pkg', require('load-pkg')());
  this.set('updaters', {});

  create(this);
  this.use(utils.runtimes())
    .use(locals({name: this.name}))
    .use(store(this.name))
    .use(config())
    .use(loader())
    .use(ask())
    .use(cli());

  var verb = this.get('pkg.verb');
  this.config.process(verb);

  this.onLoad(/\.md$/, function (view, next) {
    utils.matter.parse(view, next);
  });

  this.option('rethrow', { regex: /\{%=?([^%]*)%}/ });
  this.engine('md', require('engine-base'), {
    delims: ['{%', '%}']
  });
}

/**
 * Inherit `Core`
 */

Core.extend(Verb);

/**
 * Expose `Verb`
 */

module.exports = Verb;

/**
 * Expose `Verb`
 */

module.exports.utils = utils;
