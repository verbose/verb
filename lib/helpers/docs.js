'use strict';

// module.exports = function(name, locals, cb) {
//   var doc = this.lookup('docs', name);
//   this.render(doc, locals, function(err, content) {
//     if (err) return cb(err);
//     cb(null, content);
//   });
// };

/**
 * Module dependencies
 */

var debug = require('debug')('verb:helper:docs');

module.exports = function (app) {
  return function(name, locals, cb) {
    debug('docs helper: %j', arguments);
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }

    var doc = app.lookup('docs', name);

    if (typeof doc !== 'object') {
      throw new Error('cannot find: {%= docs("' + name + '") %}');
    }

    doc.render(locals, function(err, content) {
      if (err) {
        console.log(err);
        debug('docs helper err: %j', err);
        return cb(err);
      }
      cb(null, content);
    });
  };
};
