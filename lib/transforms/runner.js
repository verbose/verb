'use strict';

/**
 * Add `runner` info to the context. This is
 * used in places like the `footer` include that
 * is used in the default .verb.md template.
 */

module.exports = function runner(verb) {
  verb.data({
    runner: {
      name: 'verb',
      url: 'https://github.com/assemble/verb'
    }
  });
};
