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

module.exports = function (phaser) {
  var config = phaser.config;
  var repoUrl = '';
  var obj = {};

  // Check for a `repo` property on the context, if it
  // doesn't exist try to create one.
  if(!phaser.context.repo) {
    try {
      if (config.repository && config.repository.url) {
        repoUrl = config.repository.url;
      } else if (config.bugs && config.bugs.url) {
        repoUrl = config.bugs.url;
      }

      obj = url.parse(repoUrl);
      var repo = obj.path.replace(/(^\/|\.git$)/g, '');

      if (file.exists(phaser.cwd('.travis.yml'))) {
        phaser.context.repo = repo;
      }
    } catch (e) {
      console.log(e);
    }
  }
};