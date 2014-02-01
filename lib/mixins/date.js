/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

// Local libs
var utils = require('../utils');

var date = module.exports = function(format) {
  return utils.date(new Date(), format);
};