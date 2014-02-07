/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var delims = require('delims');
var relative = require('relative');
var file = require('fs-utils');
var _ = require('lodash');


var utils = require('../utils');


// Custom mixins
module.exports = function(config, options) {
  options = options || {};

  exports.comments = function(src, options) {
    var opts = _.extend({}, options);
    var files = utils.expand(src);
    var page = {};

    var output = files.map(function(filepath) {
      var name = file.filename(filepath);
      var relpath = relative(process.cwd(), filepath);

      // Read file
      var content = file.readFileSync(filepath, opts);

      // Generate delimiters to parse comments
      var delimOpts = {flags: 'gm', body: ''};
      var delimiters = delims(['\\/\\*\\*', '\\*\\/'], delimOpts).evaluate;

      // Capture matching comments for each file
      var comments = content.match(delimiters);

      page[name] = {};
      page[name].name = name;
      page[name].path = file.normalizeSlash(relpath);
      page[name].comments = [];

      comments.forEach(function(comment) {
        page[name].comments.push({
          comment: comment
        });
      });

      // The first comment on each page should be a
      // banner. So let's remove it from the result.
      page[name].comments.shift();


      return page;
    });
    file.writeJSONSync('test/actual/matches.json', page);
    return output;

    // console.log(output);
    // return output;
  };

  return exports;
};