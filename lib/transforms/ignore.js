'use strict';

/**
 * Ignore patterns for files to ignore.
 *
 * @param  {Object} `verb`
 */

module.exports = function(verb) {
  var ignored = verb.option('ignore');
  var defaults = [
    '.git',
    'coverage',
    'node_modules',
    'temp',
    'tmp',
    'vendor'
  ];

  verb.set('data.ignore', ignored || defaults);
};