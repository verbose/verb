/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

// Replacement patterns
exports.escapeTemplates = [
  {
    pattern: /^`#/gm,
    replacement: '#'
  },
  {
    pattern: /\[\%/g,
    replacement: '{%'
  },
  {
    pattern: /\%\]/g,
    replacement: '%}'
  },
  {
    pattern: /^\s*/,
    replacement: ''
  },
  {
    pattern: /\s*\{{!(--)?.+(--)?}}/g,
    replacement: ''
  },
  {
    pattern: /\[\[!/g,
    replacement: '{{!'
  },
  {
    pattern: /\]\]/g,
    replacement: '}}'
  }
];