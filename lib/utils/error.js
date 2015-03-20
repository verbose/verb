'use strict';

var util = require('util');
var chalk = require('chalk');
var _ = require('lodash');

/**
 * Based on gulp-util PluginError
 * https://github.com/wearefractal/gulp-util
 * MIT License
 */

var nonEnumerable = ['name', 'message', 'stack'];
var ignore = nonEnumerable.concat(['plugin', 'showStack', 'showProperties', '__safety', '_stack']);
var properties = ['name', 'message', 'fileName', 'lineNumber', 'stack', 'showStack', 'showProperties', 'plugin'];

function PluginError(plugin, message, options) {
  if (!(this instanceof PluginError)) {
    throw new Error('Call PluginError using new');
  }

  Error.call(this);
  var opts = setDefaults(plugin, message, options);
  var self = this;

  // if opts has an error, grab details from it
  if (typeof opts.error === 'object') {
    var keys = Object.keys(opts.error);

    // These properties are not enumerable, so we have to add them explicitly.
    _.unique(keys.concat(nonEnumerable)).forEach(function(prop) {
      self[prop] = opts.error[prop];
    });
  }

  // opts object can override
  properties.forEach(function(prop) {
    if (prop in opts) this[prop] = opts[prop];
  }, this);

  // defaults
  if (!this.name) {
    this.name = 'Error';
  }

  if (!this.stack) {
    var safety = {};

    /**
     * Error.captureStackTrace appends a stack property
     * which relies on the toString method of the object
     * it is applied to.
     *
     * Since we are using our own toString method which
     * controls when to display the stack trace, if we don't
     * go through this safety object we'll get stack
     * overflow problems.
     */

    safety.toString = function() {
      return this._messageWithDetails() + '\nStack:';
    }.bind(this);

    // console.log(arguments.callee)
    Error.captureStackTrace(safety, arguments.callee || this.constructor);
    this.__safety = safety;
  }
  if (!this.plugin) throw new Error('Missing plugin name');
  if (!this.message) throw new Error('Missing error message');
}

util.inherits(PluginError, Error);


PluginError.prototype._messageWithDetails = function() {
  var msg = 'Message:\n    ' + this.message;
  var details = this._messageDetails();
  if (details !== '') msg += '\n' + details;
  return msg;
};

PluginError.prototype._messageDetails = function() {
  if (!this.showProperties) return '';
  var self = this;

  var keys = Object.keys(this);
  var props = _.difference(keys, ignore);

  var len = props.length;
  if (len === 0) return '';

  var res = [], i = 0;
  while (len--) {
    var prop = props[i++];
    res += '    ';
    res += prop;
    res += ': ';
    res += self[prop];
    res += '\n';
  }
  return 'Details:\n' + res;
};

PluginError.prototype.toString = function () {
  var detailsWithStack = function(stack) {
    return this._messageWithDetails() + '\nStack:\n' + stack;
  }.bind(this);

  if (this.hasOwnProperty('showStack')) {
    // If there is no wrapped error, use the stack
    // captured in the PluginError ctor
    if (this.hasOwnProperty('__safety')) {
      return message(this.__safety.stack, this);
    }
    if (this.hasOwnProperty('_stack')) {
      return message(detailsWithStack(this._stack), this);
    }
    // Stack from wrapped error
    return message(detailsWithStack(this.stack), this);
  }
  return message(this._messageWithDetails(), this);
};

function message(msg, thisArg) {
  var sig = chalk.red(thisArg.name);
  sig += ' in plugin ';
  sig += '"';
  sig += chalk.cyan(thisArg.plugin);
  sig += '"';
  sig += '\n';
  sig += msg;
  return sig;
}

function setDefaults(plugin, message, opts) {
  if (typeof plugin === 'object') {
    return defaults(plugin);
  }

  opts = opts || {};
  if (message instanceof Error) {
    opts.error = message;
    return defaults(opts);
  }

  if (typeof message === 'object') {
    return defaults(message);
  }

  opts.message = message;
  opts.plugin = plugin;
  return defaults(opts);
}

function defaults (opts) {
  return _.extend({showStack: false, showProperties: true}, opts);
}

module.exports = PluginError;
