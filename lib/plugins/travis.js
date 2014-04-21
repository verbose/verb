/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const file = require('fs-utils');
const _ = require('lodash');
const tmpl = require('repo-templates');

/**
 * .travis.yml
 */

module.exports = function(verb) {
  var options = _.extend({}, verb.options || {});
  var context = verb.context;

  try {
    var url = context.repository.url;
    var re = /.*:\/\/github.com\/(.*)\.git/;

    /**
     * If `.travis.yml` does not exist, and
     * `travis: true` is defined in the options,
     * then add a `.travis.yml` file to the root
     * of the project.
     *
     * @title Travis CI badge
     */

    if (options.travis && !file.exists(verb.cwd('.travis.yml'))) {
      var travis = file.match('*travis.yml', tmpl, {matchBase: true})[0];

      // Save the file
      file.writeFileSync('.travis.yml', file.readFileSync(travis));
      // Log a success message
      verb.log.success('Saved:', '.travis.yml');
    }


    /**
     * If `.travis.yml` already exists, add
     * a travis URL to the context for use
     * in templates
     *
     * @title Travis CI badge
     */

    if(file.exists(verb.cwd('.travis.yml'))) {
      verb.context.travis = url.replace(re, 'https://travis-ci.org/$1');
    }

  } catch (e) {
    e.origin = __filename;
    console.warn(e);
  }
};