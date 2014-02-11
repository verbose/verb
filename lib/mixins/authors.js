/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Local libs
var utils = require('../utils');
var _ = require('lodash');

module.exports = function(config, options, params) {
  options = options || {};

  exports.authors = function(prop) {
    var authors = params.context.authors || [];
    authors = _.flatten(authors);
    if(prop) {
      return _.pluck(authors, prop);
    } else {
      return authors;
    }
  };
  _.mixin(exports);
  return exports;
};