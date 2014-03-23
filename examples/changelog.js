var verb = require('../');

/**
 * Changelog example.
 * Formatting is handled by the changelog tag
 */

var src = 'examples/templates/changelog.md';
var dest = 'test/actual/changelog.md';

verb.copy(src, dest);

// Custom data source
var dest2 = 'test/actual/changelog2.md';
verb.copy(src, dest2, {changelog: 'examples/data/changelog.json'});