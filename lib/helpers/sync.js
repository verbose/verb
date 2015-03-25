'use strict';

/**
 * Transform for loading default sync helpers
 */

module.exports = function sync_(verb) {
  verb.helper('codelinks', require('verb-helper-codelinks'));
  verb.helper('changelog', require('helper-changelog'));
  verb.helper('copyright', require('helper-copyright'));
  verb.helper('license', require('helper-license'));
  verb.helper('date', require('helper-date'));

  // verb.helpers({
  //   copyright: function (str) {
  //     return 'placeholder';
  //   },
  //   license: function (str) {
  //     return 'placeholder';
  //   }
  // });
};
