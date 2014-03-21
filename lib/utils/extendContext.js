/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var _ = require('lodash');

module.exports = function (verb, patterns) {
  var obj = {};

  // If patterns is defined as an object,
  // extend the context with it directly
  if (_.isPlainObject(patterns)) {
    obj = _.extend(obj, patterns || {});
  }

  // Else, if patterns is defined as a string,
  // assume it's a filepath or glob patterns and
  // and try to expand it
  if (_.isString(patterns) || _.isArray(patterns)) {
    patterns = !Array.isArray(patterns) ? [patterns] : patterns;

    patterns.forEach(function(pattern) {

      // Don't waste cycles trying to expand if it isn't a glob pattern
      var globlike = /[*.?[,{\\\/]/.test(pattern);

      // Skip this step if it looks like a glob pattern
      if (!globlike) {
        // Try to require if it looks like it could be a npm module
        try {
          _.extend(obj, require(String(pattern)));
          verb.verbose.success('Registered npm module:', pattern);
        } catch(e) {}
      } else if (globlike) {
        file.expand(pattern).map(function (filepath) {
          filepath = verb.cwd(filepath);
          // Try to require any actual files
          try {
            _.extend(obj, require(filepath)(verb));
            verb.verbose.success('Registered local file:', filepath);
          } catch (e) {
            verb.verbose.warn('[verb]: `'+ filepath +'` should export a function with `verb` as the only argument.', e);
          }
        });
      } else {
        filepath = verb.cwd(filepath);
        try {
          _.extend(obj, require(filepath)(verb));
          verb.verbose.success('Registered local file:', filepath);
        } catch (e) {
            verb.verbose.warn('[verb]: `'+ filepath +'` should export a function with `verb` as the only argument.', e);
        }
      }

    });

  }
  return obj;
};