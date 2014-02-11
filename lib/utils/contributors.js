/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

// Local libs

exports.contributors = function (config, prefix) {
  config = config || {};
  config.contributors = [];
  prefix = prefix || '* ';
  try {
    return config.contributors.map(function(contributor) {
      return prefix + contributor.name || 'Name not found';
    }).join('\n');
  } catch (err) {
    throw new Error('_(No contributors found)_');
  }
};


_.mixin(exports);