var verb = require('../');

/**
 * Changelog example.
 * Formatting is handled _by the changelog tag_.
 */

var src = 'examples/templates/changelog.md';
var dest = 'test/actual/changelog.md';
verb.copy(src, dest);