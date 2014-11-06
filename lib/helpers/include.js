'use strict';

/**
 * Module dependencies
 */

var debug = require('debug')('verb:helper:include');

module.exports = function(app) {
  return function(name, locals, cb) {
    debug('include helper: %j', arguments);
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }

    var include = app.lookup('includes', name);
    if (typeof include !== 'object') {
      throw new Error('cannot find include: "' + name + '"');
    }

    include.render(locals, function(err, content) {
      if (err) {
        console.log(err);
        debug('include helper err: %j', err);
        return cb(err);
      }
      cb(null, content);
    });
  };
};