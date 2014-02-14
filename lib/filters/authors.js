/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

module.exports = function (phaser) {
  var opts = _.extend({}, phaser.options);
  phaser.context.authors = opts.authors || phaser.utils.authors() || [];
};