/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Local libs
var _ = require('lodash');

module.exports = function(phaser) {

  exports.getAuthors = function(prop) {
    var authors = phaser.context.authors || [];
    authors = _.flatten(authors);
    if(prop) {
      authors = _.pluck(authors, prop);
    } else {
      authors = authors;
    }
    phaser.context.authors = authors;
    return authors;
  };

  _.mixin(exports);
  return exports;
};