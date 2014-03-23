/**
 * This example uses >
 *   examples/plugins/html-comments.js
 *
 * The plugin uses regex to convert
 * HTML comments to valid Lo-Dash templates.
 */


var verb = require('../');

var src = 'examples/templates/html-comments.md';
var dest = 'test/actual/html-comments.md';

verb.copy(src, dest, {
  plugins: ['examples/plugins/*.js']
});
