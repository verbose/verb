'use strict';

var parser = require('parser-front-matter');
var extend = require('extend-shallow');

/**
 * Default middleware for parsing front-matter
 */

module.exports = function (verb) {
  return function (file, next) {
    var opts = extend({}, file.options, verb.option('matter'));
    parser.parse(file, opts, function (err) {
      if (err) return next(err);
      next();
    });
  }
}
