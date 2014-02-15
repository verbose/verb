/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var file = require('fs-utils');
var _ = require('lodash');

module.exports = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var cwd = phaser.cwd(opts.cwd || 'docs');

  /**
   * Boilerplates are used to kickstart new projects.
   * Using the API, you can pre-define a boilerplate
   * to use when a new project is initialized.
   *
   * @name boilerplate
   *
   * @param {Object} config
   * @param {Object} options
   * @return {Object}
   *
   * @api private
   */
  exports.boilerplate =function (patterns, options) {
    var defaults = {cwd: cwd, ext: '.md'};
    var opts = _.extend(defaults, phaserOpts, options);
    var boilerplates = require('readme-boilerplates');

    return boilerplates(patterns).map(function(filepath) {
      var content = file.readFileSync(filepath, opts);
      return phaser.utils.adjust.headings(content);
    });
  };

  return exports;
};

// // The root of the project. This is where the Gruntfile is.
// var root = function (filepath) {
//   return path.join.bind(null, __dirname, '../', filepath);
// };

// // // Recurse into a directory, executing callback for each file.
// // file.recurse = function recurse(rootdir, callback, subdir) {
// //   var abspath = subdir ? path.join(rootdir, subdir) : rootdir;
// //   fs.readdirSync(abspath).forEach(function (filename) {
// //     var filepath = path.join(abspath, filename);
// //     if (fs.statSync(filepath).isDirectory()) {
// //       recurse(rootdir, callback, unixifyPath(path.join(subdir || '', filename || '')));
// //     } else {
// //       callback(unixifyPath(filepath), rootdir, subdir, filename);
// //     }
// //   });
// // };

// if (!_.isEmpty(options.boilerplate)) {
//   var boilerplate = root('templates', 'boilerplates')(options.boilerplate);

//   if (file.isDir(boilerplate)) {
//     file.recurse(boilerplate, function (filepath, rootdir, subdir, filename) {
//       if (!file.exists(docs(filename))) {
//         file.copy(filepath, docs(filename));
//       }
//     });
//   }
// }