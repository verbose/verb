'use strict';

var utils = require('../../utils');

/**
 * Add a reflinks helper to
 */

module.exports = function(verb) {
  return addReflinks(verb, { verbose: true });
};

function addReflinks(app, opts) {
  var cache = {};

  return function(view, next) {
    if (!view.isType('renderable') || cache[view.path]) {
      return next();
    }

    var arr = app.pkg.get('verb.reflinks');
    if (Array.isArray(arr)) {
      var reflinks = utils.reflinks(opts);

      reflinks(arr, function(err, res) {
        if (err) return next(err);
        cache[view.path] = true;
        // only show logging message once
        opts.verbose = false;
        view.content += '\n\n' + res;
        next();
      });
    } else {
      next();
    }
  };
}

module.exports.addReflinks = addReflinks;
