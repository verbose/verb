'use strict';

// var reflinks = require('helper-')

/**
 * Lint readme.md for missing reflinks, and add them to
 * package.json if enabled by the user.
 */

module.exports = function(app) {
  var arr = app.pkg.get('verb.reflinks') || [];
  var re = /(\[[\w._-]+?\]\[\])/g;

  return through.obj(function(file, enc, next) {
    var matches = file.content.match(re);
    if (matches && matches.length) {
      matches.forEach(function(match) {
        var idx = match.indexOf(']');
        var name = match.slice(1, idx).trim();
        if (arr.indexOf(name) === -1) {
          arr.push(name);
          count++;
        }
      });
    }

    reflinks(arr, function() {

    });
  });
};
