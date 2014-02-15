/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

module.exports = function (config, prefix) {
  config = config || {};
  config.contributors = [];
  prefix = prefix || '* ';

  if(config.contributors) {
    return config.contributors.map(function(contributor) {
      return prefix + contributor.name || 'Name not found';
    }).join('\n');
  } else {
    phaser.log.warn('_(No contributors found)_');
  }
};