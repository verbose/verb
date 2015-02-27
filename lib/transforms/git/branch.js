'use strict';

var branch = require('git-branch');

/**
 * Add the current git branch to the context.
 *
 * To get the branch:
 *
 * ```js
 * verb.get('data.git.branch');
 * ```
 * Or in templates:
 *
 * ```md
 * {%= git.branch %}
 * ```
 */

module.exports = function(verb) {
  verb.set('data.git.branch', branch());
};
