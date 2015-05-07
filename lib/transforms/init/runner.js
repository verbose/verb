'use strict';

/**
 * Adds data to the context for the current `verb.runner`.
 */

module.exports = function(app) {
  app.data({
    runner: {
      name: 'verb-cli',
      url: 'https://github.com/assemble/verb-cli'
    }
  });
};
