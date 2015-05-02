'use strict';

var path = require('path');
var cwd = require('cwd');

/**
 * Load templates for built-in template types.
 */

module.exports = function load_(verb) {
  /* deps: readme-includes readme-badges */
  var includes = tryRequire(verb.config.get('includes'), 'readme-includes');
  var badges = tryRequire(verb.config.get('badges'), 'readme-badges');
  var docs = tryRequire(verb.config.get('docs'), cwd('docs'));

  verb.examples('*.js', { cwd: cwd(), cache: true });
  verb.includes('**/*.md', { cwd: includes, cache: true });
  verb.badges('**/*.md', { cwd: badges, cache: true });
  verb.docs('**/*.md', { cwd: docs, cache: true });
};

function tryRequire(name, fallback) {
  if (typeof name === 'string') {
    try {
      return require(name);
    } catch(err) {
      try {
        return require(path.resolve(name));
      } catch(err) {}
      return path.resolve(fallback);
    }
  } else {
    try {
      return require(fallback);
    } catch(err) {
      return path.resolve(fallback);
    }
  }
}
