'use strict';

/**
 * Adds data to the context for the current `verb.runner`.
 */

module.exports = function runner_(verb) {
  verb.data({
    runner: {
      name: 'verb-cli',
      url: 'https://github.com/assemble/verb-cli'
    }
  });
};
