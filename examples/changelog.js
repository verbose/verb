/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var verb = require('../');

/**
 * Release history example.
 * All formatting is done in the
 * templates.
 */

// var history = 'examples/templates/release-history.md';
// var historyDest = 'test/actual/release-history.md';
// verb.copy(history, historyDest);

/**
 * Changelog example. All formatting
 * is handled by the changelog tag.
 */

var changelog = 'examples/templates/changelog.md';
var changelogDest = 'test/actual/changelog.md';
verb.copy(changelog, changelogDest);