/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');

module.exports = function(phaser, patterns) {
  var obj = _.extend({}, obj);
  var cwd = phaser.cwd();

  // If patterns is defined as an object,
  // extend the context with it directly
  if(_.isPlainObject(patterns)) {
    obj = _.extend(obj, patterns || {});
  }

  // Else, if patterns is defined as a string,
  // assume it's a filepath or glob patterns and
  // and try to expand it
  if(_.isString(patterns) || _.isArray(patterns)) {
    try {
      file.expand(patterns, {cwd: cwd}).filter(function(filepath) {
        filepath = path.resolve(cwd, filepath);
        if (!file.exists(filepath)) {
          phaser.verbose.error('>> Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        filepath = path.resolve(cwd, filepath);

        // Prevent errors from non-requireable files.
        try {
          // Then try to require any valid files
          obj = _.extend(obj, require(filepath)(phaser));
          phaser.verbose.success('Registered', filepath);
        } catch(e) {
          phaser.verbose.warn(e);
        }
      });
    } catch (e) {
      e.origin = __filename;
      phaser.verbose.warn('No extensions found: (error code "' + e.code + '").', e);
    }
  }
  return obj;
};

