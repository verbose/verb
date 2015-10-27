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

var path = require('path');
var Core = require('assemble-core');
var ask = require('assemble-ask');
var config = require('./defaults');
var utils = require('./lib/utils');
var lib = require('./lib');

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

  this.use(lib.store);
  this.use(lib.locals);
  this.use(ask());
  // this.use(lib.config);
  this.use(lib.helpers);
  this.use(lib.defaults);
  this.use(config);

  this.define('isVerb', true);
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
