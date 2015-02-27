'use strict';

var utils = require('../shared/utils');

/**
 * This is the first transform we run, to
 * initialize the user environment.
 */

module.exports = function(verb) {
  // load verb's package.json onto `verb.verb`
  verb.transform('verb', require('./verb'));

  // load users's package.json onto `verb.cache.data`
  verb.transform('pkg', require('./pkg'));

  // prime the `verb.cache.stats` object
  verb.transform('stats', require('./stats'));

  // load the repo URL onto `verb.cache.data`
  verb.transform('urls', require('./urls'));

  // build up a list of files and directories
  // in the current project.
  var files = utils.tryReaddirs(process.cwd());
  verb.set('stats.files', files);

  // bind matchers to the provided list of files.
  verb.exists = utils.exists(files);
  verb.files = utils.files(files);
};