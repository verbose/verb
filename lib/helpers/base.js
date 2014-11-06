'use strict';

/**
 * Module dependencies
 */

var debug = require('debug')('verb:helper:base');

module.exports = function(name) {
  return function(key, locals, cb) {
    var template = this.lookup(name, key);

    debug(name + ' helper %s', template);

    this.render(template, locals, function(err, content) {
      debug(name + ' helper render %s', arguments);
      if (err) return cb(err);
      cb(null, content);
    });
  }
};