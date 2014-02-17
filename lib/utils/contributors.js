/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (config, prefix) {
  config = config || {};
  config.contributors = [];
  prefix = prefix || '* ';

  if(config.contributors) {
    return config.contributors.map(function(contributor) {
      return prefix + contributor.name || 'Name not found';
    }).join('\n');
  } else {
    console.warn('_(No contributors found)_');
  }
};