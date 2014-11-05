'use strict';

module.exports = function(name, locals, cb) {
  var doc = this.lookup('docs', name);
  this.render(doc, locals, function(err, content) {
    if (err) return cb(err);
    cb(null, content);
  });
};