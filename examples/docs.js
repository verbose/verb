/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */
var phaser = require('../');
phaser.expandMapping(['*.md'], 'test/actual/', {phaserrc: 'examples/.phaserrc'});

// var phaser = require('../');
// var dest = '../../assemble/sandbox/md-viewer/content/';
// var phaserrc = 'examples/.phaserrc';
// var cwd = 'test/fixtures';

// // generate common docs
// phaser.expandMapping(
// 	// source files
// 	['*.md', '!_glossary.md', '!comment.tmpl.md'],
// 	// destination
// 	dest,
// 	// options
// 	{
// 		phaserrc: phaserrc,
// 		cwd: cwd
// 	});

// // generate "book" style docs
// // chapters first
// phaser.expandMapping(
// 	// source files
// 	['*.md'],
// 	// destination
// 	dest + 'book/',
// 	// options
// 	{
// 		phaserrc: phaserrc,
// 		cwd: cwd + '/includes'
// 	});

// // now the index/glossary/toc for all chapters
// phaser.expandMapping(
// 	// source file
// 	['_glossary.md'],
// 	// destination
// 	dest + 'book/index.md',
// 	// options
// 	{
// 		phaserrc: phaserrc,
// 		cwd: cwd
// 	});
