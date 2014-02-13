/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var file = require('fs-utils');
var phaser = require('../');
// phaser.expandMapping('*.tmpl.md', 'test/actual/');

// // Read a file, then process with Phaser
// phaser.read = function(src, options) {
//   var content = file.readFileSync(src);
//   return phaser(content, _.extend({}, options)).content;
// };

// // Read a file, process it with Phaser, then write it.
// phaser.copy = function(src, dest, options) {
//   var opts = _.extend({}, options);
//   file.writeFileSync(dest, phaser.read(src, opts));
//   phaser.log.success('>> Saved to:', dest);
// };

// phaser.expandMapping = function(src, dest, options) {
//   var opts = _.extend({}, options);
//   var count = 0;
//   file.expandMapping(src, dest, opts.glob || {}).map(function(fp) {
//     count++;
//     file.writeFileSync(fp.dest, phaser.read(fp.src, opts));
//     console.log('>> Saved to:', fp.dest);
//   });
//   if(count > 0) {
//     // Log a success message if everything completed.
//     console.log('\n>> Completed successfully.');
//   } else {
//     console.warn('Failed.');
//   }
// };

var opts = {destBase: 'test/actual', flatten: true};

file.expandMapping('docs/*.tmpl.md', opts).map(function(fp) {
  var src = file.readFileSync(fp.src[0]);
  file.writeFileSync(fp.dest, phaser(src));
});
