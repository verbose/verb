/**
 * verb.expand
 *
 * Source files are expanded and automatically
 * mapped to the given destination.
 */

var verb = require('../');
verb.expand('docs/*.md', 'test/actual/');