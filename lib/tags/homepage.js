/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var origin = require('remote-origin-url');


module.exports = function (phaser) {
  var config = phaser.config;
  var utils = phaser.utils;

  return function (address) {
    var homepage = address || config.homepage || '';
    if(homepage.length === 0) {
      if (config.repository.url && config.repository.url.length > 0) {
        homepage = utils.convertUrl(config.homepage);
      } else if (typeof origin.url() === 'string') {
        homepage = utils.convertUrl(origin.url());
      } else {
        phaser.log.warn(chalk.yellow('>> No "homepage" URL found.'));
      }
    }
    phaser.context.homepage = homepage;
  };
  return exports;
};


