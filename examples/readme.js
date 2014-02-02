/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Node.js
var path = require('path');

// node_modules
var glob = require('globule');
var file = require('fs-utils');
var _ = require('lodash');

var phaser = require('../');

var defaults = {cwd: 'docs', ext: '.md'};

var expand = function (src, options) {
  options = _.extend({sep: '\n', prefixBase: true}, options);
  options.cwd = options.cwd || process.cwd();

  return glob.find(src, options).map(function(filepath) {
    return file.readFileSync(filepath);
  }).join(options.sep);
};

// var tmpl = foo('/**');
// file.writeJSONSync('tmpl.json', tmpl);
// console.log(tmpl.badges);

var opts = {
  mixins: ['./lib/mixins/*.js'],
  functions: {
    include: function (name, options) {
      name = !Array.isArray(name) ? [name] : name;
      var opts = _.extend(defaults, options);
      var templates = require('readme-templates');
      var includes = templates('*').includes;
      // var filepaths = includes.filter(function (filepath) {
      //   return file.basename(filepath) === name[0];
      // });

      // return filepaths.map(function(filepath) {
      //   var content = file.readFileSync(filepath, opts);
      //   return content.replace(/^#/gm, '##');
      // });
    },
    contrib: function (name, options) {
      var opts = _.extend(defaults, options);
      var contrib = require('readme-contrib');

      var filepaths = _.filter(contrib, function (filepath) {
        return file.basename(filepath) === name;
      });

      // if no matches, then try minimatch
      if (!filepaths || filepaths.length <= 0) {
        filepaths = contrib.filter(minimatch.filter(name));
      }

      return filepaths.map(function(filepath) {
        var content = file.readFileSync(filepath, opts);
        return content.replace(/^#/gm, '##');
      });
    },
    boilerplate: function (patterns, options) {
      var opts = _.extend(defaults, options);
      var boilerplates = require('readme-boilerplates');

      return boilerplates(patterns).map(function(filepath) {
        var content = file.readFileSync(filepath, opts);
        return content.replace(/^#/gm, '##');
      });
    }
  }
};


phaser.expand('*.tmpl.md', 'test/actual/', opts);
