'use strict';

var differ = require('diff');
var through = require('through2');
var utils = require('./utils');

/**
 * Output to the console a visual representation of the difference between
 * two objects or strings.
 *
 * @param {Object|String} `a`
 * @param {Object|String} `b`
 * @api public
 */

module.exports = function(options) {
  options = options || {};
  var cache = {};
  var prev;

  return function(a, b) {
    return through.obj(function(file, enc, next) {
      if (options.diff === false) {
        next(null, file);
        return;
      }
      var contents = file.contents.toString();
      cache[a] = contents;
      var str = b ? (cache[b] || b) : prev;

      if (typeof str !== 'undefined') {
        diff(contents, cache[b]);
        next();
        return;
      }
      prev = contents;
      next(null, file);
    });
  };
};

function diff(a, b, method) {
  differ[method || 'diffWords'](a, b).forEach(function(stat) {
    process.stderr.write(utils.log[color(stat)](stat.value));
  });
  console.error();
}

function color(stat) {
  if (stat.removed) return 'red';
  if (stat.added) return 'green';
  return 'gray';
}
