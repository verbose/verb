/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var file = require('fs-utils');
var _ = require('lodash');

// An array of all badge templates.
var badges = require('verb-readme-badges');

module.exports = function (verb) {
  var verbOpts = verb.options || {};
  var config = verb.config;

  /**
   * Status, analytics and version badges.
   *
   * @title badge
   * @param {Object} config
   * @param {Object} options
   * @return {Object}
   *
   * @api private
   */
  exports.badge = function (name, options) {
    var opts = _.extend({ext: '.md'}, verbOpts, options || {});
    opts.cwd = verb.cwd(opts.cwd || 'docs');

    var files = file.match(name + '.md', badges, {
      matchBase: true
    });

    return files.map(function (filepath) {
      var content = file.readFileSync(filepath);

      // Extend context with options, allowing
      // context to be changed in the tag
      var context = _.extend(_.cloneDeep(verb.context), config, options);
      return verb.template(content, context);
    }).join(' ');
  };

  exports.nodei = function (opts, mos) {
    var url = 'https://nodei.co/npm';
    var name = config.name;
    opts = opts ? '?' + opts.split(',').map(function (opt) {
      return opt + '=true';
    }).join('&') : '';
    opts = opts + (mos ? '&months=' + mos : '');
    return '[![NPM](' + url + '/' + name + '.png' + opts + ')](' + url + '/' + name + '/)';
  };

  _.mixin(exports);
  return exports;
};