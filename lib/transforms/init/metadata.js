'use strict';

var path = require('path');

/**
 * Called in the `init` transform. Adds Verb's package.json
 * data to `verb.metadata`.
 *
 * @param  {Object} `app`
 */

module.exports = function(app) {
  Object.defineProperty(app, 'metadata', {
    get: function () {
      return require(path.resolve(__dirname, '../../..', 'package.json'));
    },
    set: function () {
      console.log('`verb.metadata` is read-only and cannot be modified.');
    }
  });
};
