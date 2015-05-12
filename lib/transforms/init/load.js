'use strict';

var utils = require('../../utils');
var path = require('path');
var cwd = require('cwd');

/**
 * Pre-load templates for built-in template types:
 *   | examples
 *   | includes
 *   | badges
 *   | docs
 */

module.exports = function(app) {
  app.examples('*.js', { cwd: cwd(), cache: true });
  app.includes('**/*.md', opts(app, 'includes', 'readme-includes'));
  app.badges('**/*.md', opts(app, 'badges', 'readme-badges'));
  app.docs('**/*.md', opts(app, 'docs'));
};

function opts(app, name, fallback) {
  var paths = app.config.get('templates');
  var defaults = app.option('defaults.templates');
  var options = { cwd: '.', cache: true };

  var fp;
  if (paths.hasOwnProperty(name)) {
    fp = utils.tryRequire(paths[name]);
    if (!fp) fp = path.resolve(paths[name]);
  }

  if (!fp && defaults.hasOwnProperty(name)) {
    fp = utils.tryRequire(defaults[name]);
    if (!fp) fp = path.resolve(defaults[name]);
  }

  options.cwd = fp;
  return options;
}
