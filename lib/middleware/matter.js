'use strict';

var parser = require('parser-front-matter');
var extend = require('extend-shallow');

/**
 * Default middleware for parsing front-matter
 */

module.exports = function (app) {
  return function (file, next) {
    var opts = extend({}, file.options, app.option('matter'));
    parser.parse(file, opts, function (err) {
      if (err) return next(err);
      next();
    });
  };
};
