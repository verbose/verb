'use strict';

var parse = require('parse-git-config');

/**
 * Parse .git/config fill in blanks.
 */

module.exports = function(verb) {
  verb.set('data.git.config', parse.sync());
  verb.set('data.git.branch', require('./branch'));
};
