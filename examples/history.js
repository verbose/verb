var verb = require('../');

/**
 * Release history example.
 * All formatting is done in the templates.
 */

var src = 'examples/templates/release-history.md';
var dest = 'test/actual/release-history.md';
verb.copy(src, dest);