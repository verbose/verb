'use strict';

/**
 * The current runner for verb. This is to be customized
 * be implementors.
 */

module.exports = function runner(verb) {
  verb.data({
    runner: {
      name: 'verb-cli',
      url: 'https://github.com/assemble/verb-cli'
    }
  });
};