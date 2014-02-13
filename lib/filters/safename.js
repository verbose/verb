/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

module.exports = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);

  exports.safename = function (name, options) {
    var opts = _.extend({}, phaserOpts, options);
    return phaser.utils.safename(name, opts);
  };

  return exports;
};