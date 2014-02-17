/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var url = require('url');
var file = require('fs-utils');
var glob = require('globule');

module.exports = function (phaser) {
  if(!phaser.context.username) {
    try {
      var username = phaser.context.repo.split('/')[0];
      phaser.context.username = username;
    } catch(e) {
      e.origin = __filename;
      var msg = 'Cannot find "username" on the context. ';
      console.warn(msg + e);
    }
  }
};