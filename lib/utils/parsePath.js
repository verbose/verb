'use strict';

var path = require('path');
var parse = require('parse-filepath');

/**
 * Add parsed `src` and `dest` path properties to the `data` object.
 *
 * @name parsePath
 * @param  {Object} `file` Template object
 * @api public
 */

module.exports = function parsePath_(file) {
  if (typeof file.path !== 'string') {
    throw new Error('[file-utils] parsePath expects `.path` to be a string');
  }

  // add default `src` and `dest` properties to the `data` object
  file.data = file.data || {};
  file.data.src = {};
  file.data.dest = {};

  // add `ext` to the root of the file object
  file.ext = file.ext || path.extname(file.path);

  // Parse `file.path` into an object
  var segments = parse(file.path);

  for (var key in segments) {
    if (segments.hasOwnProperty(key)) {
      file.data.src[key] = file.data.src[key] || segments[key];
      file.data.dest[key] = file.data.dest[key] || segments[key];
    }
  }

  file.data.src.path = file.data.src.path || file.path;
  file.data.dest.path = file.data.dest.path || file.data.src.path;
  file.data.dest.ext = file.data.dest.ext || segments.extname;
  return file;
};
