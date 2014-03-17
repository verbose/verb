/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var moment = require('moment');
var columnify = require('columnify');
var _ = require('lodash');

module.exports = function (verb) {
  var verbOpts = _.extend({}, verb.options);
  var filepath = verb.cwd('CHANGELOG') || verbOpts.changelog;
  var content = file.readYAMLSync(filepath);

  exports.changelog = function (options) {
    var opts = _.extend({}, verbOpts, options);

    try {
      var changelog = [];

      // Convert changelog object to an array.
      // We want the version key to convert
      // to `version: "v0.1.0"`
      for (var i in content) {
        changelog.push({
          date: ' * ' + moment(content[i].date).format('YYYY-MM-DD'),
          version: i,
          changes: content[i].changes
        });
      }

      // Prettify the changelog with columnify
      changelog = columnify(changelog, _.extend({
        columnSplitter: '   ',
        headingTransform: function (key) {
          return ('**' + key + '**').toUpperCase();
        },
        config: {
          changes: {
            maxWidth: 75,
          }
        }
      }, opts));

      // Print out the changelog
      return changelog;

    } catch (err) {
      verb.verbose(err);
      verb.context.changelog = {};
    }
  };
  // Add raw `history` to the context
  verb.context.history = exports.history = content;
  return exports;
};