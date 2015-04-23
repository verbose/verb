'use strict';

/**
 * Transform for loading default sync helpers
 */

module.exports = function sync_(verb) {
  verb.helper('date', require('helper-date'));
  verb.helper('apidocs', require('template-helper-apidocs'));
  verb.helper('codelinks', require('helper-codelinks')(verb));
  verb.helper('changelog', require('helper-changelog'));
  verb.helper('copyright', require('helper-copyright'));
  verb.helper('coverage', require('helper-coverage'));
  verb.helper('license', require('helper-license'));
};
