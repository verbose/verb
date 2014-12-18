'use strict';

/**
 * Create nicknames from common the names of
 * common verb "extensions".
 *
 * For example: `helper-foo` => `foo`
 */

module.exports = function nickname(verb) {
  var name = verb.cache.data.name;

  if (name.indexOf('helper-') !== -1) {
    verb.data({nickname: name.slice(7)});
  }

  if (name.indexOf('transform-') !== -1) {
    verb.data({nickname: name.slice(10)});
  }

  if (name.indexOf('route-') !== -1) {
    verb.data({nickname: name.slice(6)});
  }

  if (name.indexOf('plugin-') !== -1) {
    verb.data({nickname: name.slice(7)});
  }
};
