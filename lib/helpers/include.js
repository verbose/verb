'use strict';

module.exports = function(name, locals, cb) {
  var include = this.lookup('includes', name);
  this.render(include, locals, function(err, content) {
    if (err) return cb(err);
    cb(null, content);
  });
};