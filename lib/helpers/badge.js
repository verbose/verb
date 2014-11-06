'use strict';

/**
 * Module dependencies
 */

var debug = require('debug')('verb:helper:badge');

module.exports = function (app) {
  return function(name, locals, cb) {
    debug('badges helper: %j', arguments);
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }

    var badge = app.lookup('badges', name);
    if (typeof badge !== 'object') {
      throw new Error('cannot find badge: "' + name + '"');
    }

    badge.render(locals, function(err, content) {
      if (err) {
        console.log(err);
        debug('badges helper err: %j', err);
        return cb(err);
      }
      cb(null, content);
    });
  };
};
