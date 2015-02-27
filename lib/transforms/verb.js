'use strict';

var path = require('path');

/**
 * Called in the `init` transform. Adds Verb's package.json
 * data to `verb.verb`.
 *
 * @param  {Object} `verb`
 */

module.exports = function(verb) {
  Object.defineProperty(verb, 'verb', {
    get: function () {
      return require(path.resolve(__dirname, '../..', 'package.json'));
    },
    set: function () {
      console.log('`verb.verb` is read-only and cannot be modified.');
    }
  });
};
