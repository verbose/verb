'use strict';

var cwd = require('cwd');

/**
 * Load built-in template types
 */

module.exports = function load_(verb) {
  /* deps: readme-includes readme-badges */
  var includes = resolve(verb.store.get('includes'), 'readme-includes');
  var badges = resolve(verb.store.get('badges'), 'readme-badges');
  var docs = verb.store.get('docs') ? cwd(verb.store.get('docs')) : cwd('docs');

  verb.examples('*.js', { cwd: cwd(), cache: true });
  verb.includes('**/*.md', { cwd: includes, cache: true });
  verb.badges('**/*.md', { cwd: badges, cache: true });
  verb.docs('**/*.md', { cwd: docs, cache: true });
};

function resolve(name, fallback) {
  if (name) {
    return require(name);
  } else {
    return require(fallback);
  }
}
