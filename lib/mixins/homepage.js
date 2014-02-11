/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var url = require('url');
var chalk = require('chalk');
var _ = require('lodash');
var utils = require('../utils');
var phaser = require('../');

module.exports = function (config, options, params) {
  options = options || {};
  var context = params.context;

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
  _.mixin(exports);
  return exports;
};