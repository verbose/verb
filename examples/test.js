/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

var file = require('fs-utils');
var phaser = require('../');

// var opts = {destBase: 'test/actual', flatten: true};
// file.expandMapping('docs/*.tmpl.md', opts).map(function(fp) {
//   var src = file.readFileSync(fp.src[0]);
//   file.writeFileSync(fp.dest, phaser(src));
// });

var src = phaser.read('docs/README.tmpl.md');
file.writeFileSync('test/actual/FOO.md', src);
