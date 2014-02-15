/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */
var file = require('fs-utils');
var phaser = require('../');
var _ = require('lodash');


// Read a file, process it with Phaser, then write it.
var copy = function(src, dest, options) {
  var opts = _.extend({}, options);
  var content = file.readFileSync(src);
  file.writeFileSync(dest, phaser.process(content, opts).content);
  phaser.log.success('>> Saved to:', dest);
};


// var opts = {destBase: 'test/actual', flatten: true};
// file.expandMapping('docs/*.tmpl.md', opts).map(function(fp) {
//   var src = file.readFileSync(fp.src[0]);
//   file.writeFileSync(fp.dest, phaser.process(src));
// });

copy('docs/README.tmpl.md', 'test/actual/FOO.md', {verbose: false});