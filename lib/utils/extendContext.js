/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
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
    try {
      obj = _.extend(obj, require(filepath));
    } catch(e) {
      try {
        file.expand(patterns).map(function (filepath) {
          filepath = verb.cwd(filepath);
          try {
            // Then try to require any valid files
            obj = _.extend(obj, require(filepath)(verb));
            verb.verbose.success('Registered', filepath);
          } catch (e) {
            verb.verbose.warn(e);
          }
        });
      } catch (e) {
        e.origin = __filename;
        verb.verbose.warn('No extensions found: (error code "' + e.code + '").', e);
      }
    }
  }
  return obj;
};