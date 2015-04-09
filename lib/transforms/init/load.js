'use strict';

var includes = require('../../../support/readme-includes');
var badges = require('../../../support/readme-badges');
var cwd = require('cwd');

/**
 * Load built-in templates
 */

module.exports = function load_(verb) {
  verb.includes('**/*.md', { cwd: includes, cache: true });
  verb.badges('**/*.md', { cwd: badges, cache: true });
  verb.docs('**/*.md', { cwd: cwd('docs'), cache: true });
};
