/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var phaser = require('../');

/**
 * This example uses `html-comments.js`
 * in `./lib/plugins`.
 *
 * The plugin used regex to convert
 * HTML comments to valid Lo-Dash templates.
 */

var opts = {
  plugins: ['test/plugins/*.js']
};

var src = 'examples/templates/html-comments.md';
var dest = 'test/actual/html-comments.md';

phaser.copy(src, dest, opts);