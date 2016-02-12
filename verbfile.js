'use strict';

/**
 * Example verbfile.js, extends `verb-readme-generator`, which
 * provides the `readme` task for building the readme.
 */

module.exports = function(verb) {
  verb.extendWith('verb-readme-generator');

  // do anything here!

  verb.task('default', ['readme']);
};
