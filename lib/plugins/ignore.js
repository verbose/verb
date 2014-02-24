/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var tmpl = require('repo-templates');
var scaffold = require('../scaffolds/gitignore');

/**
 * gitignore
 */

module.exports = function(phaser) {
  var options = phaser.options || {};

  try {

    /**
     * If `gitignore` does not exist, and `gitignore: true` is
     * defined in the options, then add a `gitignore`
     * file to the root of the project. This is a command
     * line convenience.
     *
     *
     * @title gitignore
     */

    if (options.gitignore && !file.exists(phaser.cwd('.gitignore'))) {
      var gitignore = file.match('*gitignore', tmpl, {matchBase: true})[0];
      var data = file.readDataSync(gitignore);

      // Save the file
      file.writeFileSync('.gitignore', phaser.process(scaffold, data));

      // Log a success message
      phaser.log.success('Saved:', 'gitignore');
    }
  } catch (e) {
    e.origin = __filename;
    console.warn(e);
  }
};