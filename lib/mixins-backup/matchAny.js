/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

var matchAny = module.exports = function(target, filter) {
  function fn(val, patterns) {
    return _.keys(patterns).some(function (key) {
      return val[key] == patterns[key];
    });
  }
  var arr = [];
  if(_.isArray(target)) {
    target.map(function(obj) {
      arr.push(fn(obj, filter));
    });
  } else {
    arr.push(fn(target, filter));
  }
  return arr.join('\n');
};

// var objects = [
//   { a: 'a', b: 'b', c: 'c'},
//   { b: '2', c: '1'},
//   { d: '3', e: '4'},
//   { e: 'f', c: 'c'},
//   { c: 'c', d: '3'},
// ];

// console.log(matchAny(objects, { c: 'c', d: '3'}));