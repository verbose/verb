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
  var verbOpts = verb.options || {};
  var filepath = verb.cwd('CHANGELOG') || verbOpts.changelog;
  var content = file.readYAMLSync(filepath);

  exports.changelog = function (options) {
    var opts = _.extend({}, verbOpts, options);

    try {
      var changes = [];

      // Convert changelog object to an array. We want the
      // version key to convert to `version: "v0.1.0"`
      for (var i in content) {
        changes.push({
          date: ' * ' + moment(content[i].date).format('YYYY-MM-DD'),
          version: i,
          changes: content[i].changes
        });
      }

      // Prettify the changelog with columnify
      changes = columnify(changes, _.extend({
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

      // Print out the changes
      return changes;

    } catch (err) {
      verb.verbose(err);
      verb.context.changes = {};
    }
  };
  // Add raw `history` to the context
  verb.context.history = exports.history = content;
  return exports;
};