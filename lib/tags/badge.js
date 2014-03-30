/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const file = require('fs-utils');
const _ = require('lodash');

// Badge templates.
const badges = require('verb-readme-badges');

module.exports = function (verb) {
  verb.options = verb.options || {};
  var context = verb.context;

  /**
   * Status, analytics and version badges.
   *
   * @title badge
   * @param {Object} context
   * @param {Object} options
   * @return {Object}
   *
   * @api private
   */

  exports.badge = function (name, options) {
    var opts = _.extend({ext: verb.ext}, verb.options, options || {});
    opts.cwd = verb.docs;

    var files = file.match(name + opts.ext, badges, {
      matchBase: true
    });

    return files.map(function (filepath) {
      var content = file.readFileSync(filepath);

      // Extend context with options, allowing
      // context to be changed in the tag
      var context = _.extend(_.cloneDeep(verb.context), context, options);
      return verb.template(content, context);
    }).join(' ');
  };

  exports.nodei = function (opts, mos) {
    var url = 'https://nodei.co/npm';
    var name = context.name;
    opts = opts ? '?' + opts.split(',').map(function (opt) {
      return opt + '=true';
    }).join('&') : '';
    opts = opts + (mos ? '&months=' + mos : '');
    return '[![NPM](' + url + '/' + name + '.png' + opts + ')](' + url + '/' + name + '/)';
  };

  _.mixin(exports);
  return exports;
};