/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var url = require('url');
var chalk = require('chalk');

module.exports = function (phaser) {
  var config = phaser.config;

  exports.homepage = function (address) {
    var homepage = address || config.homepage || '';
    if(homepage.length === 0) {
      if (config.repository.url && config.repository.url.length > 0) {
        var obj = url.parse(config.homepage);
        var ending = obj.path.replace(/\.git$/, '/');
        homepage = 'https://' + obj.host + ending;
      } else {
        phaser.log.warn(chalk.yellow('>> No "homepage" URL found.'));
      }
    }
    return homepage;
  };
  return exports;
};