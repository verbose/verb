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

/**
 * .travis.yml
 */

module.exports = function(phaser) {
  var options = phaser.options || {};
  var config = phaser.config;

  try {
    var url = config.repository.url;
    var re = /.*:\/\/github.com\/(.*)\.git/;

    /**
     * If `.travis.yml` does not exist, and
     * `travis: true` is defined in the options,
     * then add a `.travis.yml` file to the root
     * of the project.
     *
     * @title Travis CI badge
     */

    if (options.travis && !file.exists(phaser.cwd('.travis.yml'))) {
      var travis = file.match('*travis.yml', tmpl, {matchBase: true})[0];
      travis = file.readFileSync(travis);
      // Save the file
      file.writeFileSync('.travis.yml', travis);
      // Log a success message
      phaser.log.success('Saved:', '.travis.yml');
    }


    /**
     * If `.travis.yml` already exists, add
     * a travis URL to the context for use
     * in templates
     *
     * @title Travis CI badge
     */

    if(file.exists(phaser.cwd('.travis.yml'))) {
      phaser.context.travis = url.replace(re, 'https://travis-ci.org/$1');
    }
  } catch (e) {
    e.origin = __filename;
    console.warn(e);
  }
};