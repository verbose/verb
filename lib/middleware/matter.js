'use strict';

var cloneDeep = require('clone-deep');
var parser = require('parser-front-matter');
var extend = require('extend-shallow');

/**
 * Default middleware for parsing front-matter
 */

module.exports = function matter(app) {
  app.middleware('matter', function (file, next) {
    var opts = extend({}, app.options, file.options);
    parser.parse(file, opts, function (err) {
      if (err) return next(err);

      file.data.page = cloneDeep(file.data);
      next();
    });
  });
};
