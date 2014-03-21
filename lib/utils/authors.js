/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');
var cwd = require('cwd');


module.exports = function () {
  var authors = [];

  var re = /(.+?) (?:<(.+)> ?)?\((.+)\)/;

  try {
  // Read the AUTHORS file
  var authorsFile = path.resolve(cwd('AUTHORS'));
  var content = file.readFileSync(authorsFile);

  // Each line should be a single author.
  var authorsArray = content.split(/\n/g);

  // Convert each line into an object
  authorsArray.map(function (author) {
    var matches = author.match(re) || [];
    authors.push({
      name: matches[1],
      email: matches[2] || '',
      url: matches[3] || ''
    } || {});
  });
  } catch (e) {}

  return authors;
};