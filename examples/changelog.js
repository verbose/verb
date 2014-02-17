/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var phaser = require('../');

/**
 * Release history example.
 * All formatting is done in the
 * templates.
 */

var history = 'examples/templates/release-history.md';
var historyDest = 'test/actual/release-history.md';
phaser.copy(history, historyDest);

/**
 * Changelog example. All formatting
 * is handled by the changelog tag.
 */

var changelog = 'examples/templates/changelog.md';
var changelogDest = 'test/actual/changelog.md';
phaser.copy(changelog, changelogDest);