'use strict';

/**
 * Transform for loading default sync helpers
 */

module.exports = function(app) {
  app.helper('date', require('helper-date'));
  app.helper('apidocs', require('template-helper-apidocs'));
  app.helper('multiToc', require('helper-toc')(app.option('toc')));
  app.helper('codelinks', require('helper-codelinks')(app));
  app.helper('changelog', require('helper-changelog')(app));
  app.helper('copyright', require('helper-copyright'));
  app.helper('coverage', require('helper-coverage'));
  app.helper('license', require('helper-license'));
  app.helper('relative', require('relative'));
  app.helper('year', require('year'));
};
