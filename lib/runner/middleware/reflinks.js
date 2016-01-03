'use strict';

var utils = require('../../utils');

/**
 * Add a reflinks helper to
 */

module.exports = function(verb) {
  return function(view, next) {
    var arr = verb.pkg.get('verb.reflinks');

    if (Array.isArray(arr)) {
      var reflinks = utils.reflinks({verbose: true});

      reflinks(arr, function(err, res) {
        if (err) return next(err);
        file.content += '\n\n' + res;
        next();
      });
    }
  };
};
