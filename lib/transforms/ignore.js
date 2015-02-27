'use strict';

var gitignore = require('parse-gitignore');
var utils = require('../shared/utils');

/**
 * Ignore patterns for files to ignore.
 *
 * @param  {Object} `verb`
 */

module.exports = function(verb) {
  var ignored = verb.option('ignore');

  var defaults = ['.git', 'coverage', 'node_modules', 'temp', 'tmp', 'vendor'];
  if (!verb.isFalse('gitignore')) {
    var str = utils.tryRead('.gitignore');
    if (str) {
      defaults = gitignore(str, defaults);
    }
  }

  verb.set('data.ignore', (ignored || defaults).sort());
};
