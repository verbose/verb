/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const moment = require('moment');
const columnify = require('columnify');
const plasma = require('plasma');
const _ = require('lodash');

module.exports = function (verb) {
  verb.options = verb.options || {};
  var data = {};


  exports.changelog = function (changelog) {
    var opts = _.extend({}, verb.options, {changelog: changelog});

    var dataFile = opts.changelog || verb.cwd('CHANGELOG');
    data = plasma({src: dataFile}, {lang: 'yaml'});

    try {
      var changes = [];

      // Convert changelog object to an array. We want the
      // version key to convert to `version: "v0.1.0"`
      for (var i in data) {
        changes.push({
          date: ' * ' + moment(data[i].date).format('YYYY-MM-DD'),
          version: i,
          changes: data[i].changes
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
  verb.context.history = exports.history = data;
  return exports;
};