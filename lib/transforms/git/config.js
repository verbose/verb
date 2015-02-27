'use strict';

var parse = require('parse-git-config');

/**
 * Parse .git/config fill in blanks.
 */

module.exports = function(verb) {
  var config = {};
  try {
    config = parse.sync();
  } catch(err) {}

  verb.set('data.git.config', config);
  verb.set('data.git.branch', require('./branch'));
};
