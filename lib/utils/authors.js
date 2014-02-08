/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');


module.exports = function (filepath) {
  var authors = [];

  var re = /(.+?) (?:<(.+)> ?)?\((.+)\)/;

  // Read the AUTHORS file
  var authorsFile = path.resolve(filepath);
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
  return authors;
};