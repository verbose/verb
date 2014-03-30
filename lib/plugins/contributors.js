/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const cwd = require('cwd');
const file = require('fs-utils');
const tmpl = require('repo-templates');

/**
 * CONTRIBUTING.md
 */

module.exports = function(verb) {
  verb.options = verb.options || {};

  /**
   * If `CONTRIBUTING.md` does not exist, and
   * `contributing: true` is defined in the options,
   * then add a `CONTRIBUTING.md` file to the root
   * of the project.
   *
   * @title CONTRIBUTING.md
   */

  if (verb.options.contributing && !file.exists(cwd('CONTRIBUTING.md'))) {
    var contributing = file.match('_contributing*', tmpl, {matchBase: true})[0];

    // Save the file
    file.writeFileSync('CONTRIBUTING.md', file.readFileSync(contributing));

    // Log a success message
    verb.log.success('Saved:', 'CONTRIBUTING.md');
  }
};