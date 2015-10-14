'use strict';

/**
 * module dependencies
 */

var path = require('path');
var Assemble = require('assemble');
var utils = require('./lib/utils');
var lib = require('./lib');
var datastore = lib.store;
var config = lib.config;
var locals = lib.locals;

/**
 * Create an `verb` application. This is the main function exported
 * by the verb module.
 *
 * ```js
 * var verb = require('verb');
 * var app = verb();
 * ```
 * @param {Object} `options` Optionally pass default options to use.
 * @api public
 */

var defaults = require('./lib/plugins/collections');

function Verb(options) {
  if (!(this instanceof Verb)) {
    return new Verb(options);
  }

  options = utils.defaults({}, options, {
    reload: false
  });

  Assemble.call(this, options);
  this.define('isVerb', true);


  this.use(datastore);
  this.use(locals);
  this.use(config);
  // lib.helpers(this);
  this.use(lib.helpers);
  this.use(defaults);
  // this.use(ask());
}

/**
 * Inherit `Assemble`
 */

Assemble.extend(Verb);

/**
 * Expose `Verb`
 */

module.exports = Verb;
