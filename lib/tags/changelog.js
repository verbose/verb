/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var moment = require('moment');
var columnify = require('columnify');
var _ = require('lodash');

module.exports = function (phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var filepath = phaser.cwd('CHANGELOG') ||  opts.changelog;
  var content = file.readYAMLSync(filepath);

  exports.changelog = function(options) {
    var opts = _.extend({}, phaserOpts, options);

    try {
      var changelog = [];

      // Convert changelog object to an
      // array. We want the `v0.1.0` key
      // to convert to `version: "v0.1.0"`
      for(var i in content) {
        changelog.push({
          date: ' * ' + moment(content[i].date).format('YYYY-MM-DD'),
          version: i,
          changes: content[i].changes
        })
      }

      // Prettify the changelog with columnify
      changelog = columnify(changelog, {
        columnSplitter: '   ',
        headingTransform: function(key) {
          return ('**' + key + '**').toUpperCase();
        },
        config: {
          changes: {
            maxWidth: 75,
          }
        }
      });

      // Print out the changelog
      return changelog;

    } catch (err) {
      phaser.verbose(err);
      phaser.context.changelog = {};
    }
  };
  // Add raw `history` to the context
  phaser.context.history = exports.history = content;
  return exports;
};
