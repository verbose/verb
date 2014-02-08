/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var delims = require('delims');
var relative = require('relative');
var template = require('../template');
var scrawl = require('scrawl');
var file = require('fs-utils');
var _ = require('lodash');



var utils = require('../utils');
var phaser = require('../../');



module.exports = function(config, options, params) {
  options = options || {};

  exports.comments = function(src, options) {
    var opts = _.extend({}, options);
    var files = utils.expand(src);
    var page = {};

    files.map(function(filepath) {
      var name = file.filename(filepath);
      var relpath = relative(opts.dest || process.cwd(), filepath);

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

      // var parseParams = function(param) {
      //   var match = /(?:^\{([^\}]+)\}\s+)?(?:([\S]+)\s*)?([\s\S]*)?/.exec(param);
      //   return {
      //     type: match[1],
      //     name: match[2],
      //     description: (match[3] || '').replace(/^\s*-\s*/, '')
      //   };
      // };

      comments.forEach(function(comment) {
        // var params = [];

        // comment = comment.replace(/\/\*\*/, '');
        // comment = comment.replace(/\*\//, '');
        // comment = comment.replace(/^\s*\*\s/gm, '');
        // comment = comment.replace(/^\s+/gm, '');
        // comment = comment.replace(/\s+$/gm, '');
        // // var temp = comment.replace(/\s+$/gm, '');
        // // var temp = comment.replace(/@([\S]+)/gi, '$1');
        // // temp.split('\n').map(function(ea) {
        // //   params.push(parseParams(ea));
        // // });
        // comment = comment.replace(/@([\S]+)/gi, '* `$1`: ');
        // comment = comment.replace(/\n/g, '');
        // comment = comment.replace(/\*/g, '\n*');
        // comment = comment.replace(/\*/, '\n*');
        // comment = comment.replace(/`:\s+/g, '`: ');

        // console.log(comment);
        page[name].comments.push({
          comment: scrawl.parse(comment)
        });
      });


      // The first comment on each page should be a
      // banner. So let's remove it from the result.
      page[name].comments.shift();
    });

    var tmpl = 'test/fixtures/comment.tmpl.md';

    // For debugging
    file.writeJSONSync('test/actual/matches.json', page);
    return phaser.read(tmpl, {files: page});
  };

  return exports;
};