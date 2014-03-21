var verb = require('../');

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

verb.copy(src, dest, opts);