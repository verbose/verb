/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var origin = require('remote-origin-url');

module.exports = function (phaser) {
  var config = phaser.config;
  var context = phaser.context;
  var utils = phaser.utils;
  var homepage = '';

  if (context.homepage) {
    return;
  } else if (config.homepage) {
    return;
  } else if (config.repository.url && config.repository.url.length > 0) {
    homepage = utils.convertUrl(config.repository.url);
  } else if (typeof origin.url() === 'string') {
    homepage = utils.convertUrl(origin.url());
  } else {
    phaser.log.warn(chalk.yellow('>> No "homepage" URL found.'));
  }
  phaser.context.homepage = homepage;
};