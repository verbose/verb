'use strict';

var path = require('path');

/**
 * Add Verb's package.json data to `verb.verb`.
 *
 * @param  {Object} `verb`
 * @return {Object}
 */

module.exports = function(verb) {
  Object.defineProperty(verb, 'verb', {
    get: function () {
      return require(path.resolve(__dirname, '../..', 'package.json'));
    },
    set: function () {
      console.log('verb.verb is read-only and cannot be modified.');
    }
  });
};
