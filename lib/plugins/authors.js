/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var chalk = require('chalk');
var file = require('fs-utils');
var utils = require('../utils');
var _ = require('lodash');


module.exports = function (config, options, params) {
  options = options || {};
  config.authors = options.authors || utils.authors('AUTHORS');
};