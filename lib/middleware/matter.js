'use strict';

/**
 * Module dependencies
 */

var parser = require('parser-front-matter');

module.exports = function matter(file, next) {
  parser.parse(file, function(err) {
    if (err) return next(err);
    next();
  });
};
