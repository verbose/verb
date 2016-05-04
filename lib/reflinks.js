'use strict';

var utils = require('./utils');

/**
 * Lint readme.md for missing reflinks, and add them to
 * package.json if enabled by the user.
 */

module.exports = function(app) {
  var arr = app.pkg.get('verb.reflinks') || [];
  var re = /(\[[\w._-]+?\]\[\])/g;
  var count = 0;

  return utils.through.obj(function(file, enc, next) {
    var options = app.option('reflinks') || {};
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

    if (count === 0) {
      next(null, file);
      return;
    }

    if (file.basename === '.verb.md') {
      save(app, arr);
    }

    utils.reflinks(arr, options, function(err, links) {
      if (err) return next(err);
      file.content += '\n\n';
      file.content += links.join('\n');
      next(null, file);
    });
  });
};

/**
 * Save reflinks to package.json config
 */

function save(app, arr) {
  if (app && app.pkg && typeof app.pkg.set !== 'function') {
    app.pkg.set('verb.reflinks', arr);
    app.pkg.logInfo('updated package.json with:', { reflinks: arr });
    app.pkg.save();
  }
}
