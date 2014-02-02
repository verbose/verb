/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var matchAll = module.exports = function(item, filter) {
  var keys = Object.keys(filter);
  return keys.every(function (key) {
    return item[key] == filter[key];
  });
};

var objects = [
  { a: 'a', b: 'b', c: 'c'},
  { b: '2', c: '1'},
  { d: '3', e: '4'},
  { e: 'f', c: 'c'},
  { c: 'c', d: '3'},
];
var file = require('fs-utils');

// file.writeYAMLSync('obj.yml', objects);

// objects.forEach(function(obj) {
//   console.log('Result: ', matchAll(obj, { c: 'c', d: '3'}));
// });

// Substituting some() with every() above would change the definition of match() so that all key-value pairs in the filter object must match.