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
  var phaserOpts = _.extend({}, phaser.options);

  exports.authors = function(prop) {
    var authors = params.context.authors || [];
    authors = _.flatten(authors);
    if(prop) {
      authors = _.pluck(authors, prop);
    } else {
      authors = authors;
    }
    params.context.authors = authors;
    return authors;
  };

  _.mixin(exports);
  return exports;
};