'use strict';

var includes = require('readme-includes').templates;
var badges = require('readme-badges').templates;
var cwd = require('cwd');

/**
 * Load built-in template types
 */

module.exports = function load_(verb) {
  verb.examples('*.js', { cwd: cwd(), cache: true });
  verb.includes('**/*.md', { cwd: includes, cache: true });
  verb.badges('**/*.md', { cwd: badges, cache: true });
  verb.docs('**/*.md', { cwd: cwd('docs'), cache: true });
};
