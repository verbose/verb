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
  app.badges('**/*.md', opts(app, 'badges', 'readme-badges'));
  app.includes('**/*.md', opts(app, 'includes', 'readme-includes'));
  app.examples('example.js', { cwd: cwd('.'), cache: true });
  app.docs('**/*.md', opts(app, 'docs'));
};

function opts(app, name) {
  var paths = app.config.get('templates');
  var defaults = app.option('defaults.templates');
  var res = { cwd: process.cwd(), cache: true };

  if (paths && paths.hasOwnProperty(name)) {
    res.cwd = utils.tryRequire(paths[name]);
    if (res.cwd) return res;
    res.cwd = path.resolve(process.cwd(), paths[name]);
    if (res.cwd) return res;
  }

  if (defaults.hasOwnProperty(name)) {
    res.cwd = utils.tryRequire(defaults[name]);
    if (res.cwd) return res;
    res.cwd = path.resolve(process.cwd(), defaults[name]);
  }
  return res;
}
