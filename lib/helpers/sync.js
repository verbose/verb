'use strict';

/**
 * Transform for loading default sync helpers
 */

module.exports = function sync_(verb) {
  verb.helper('changelog', require('helper-changelog'));
  verb.helper('date', require('helper-date'));

  verb.helper('copyright', function (str) {
    return 'placeholder';
  });

  verb.helper('license', function (str) {
    return 'placeholder';
  });
};
