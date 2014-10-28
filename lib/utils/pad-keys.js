'use strict';

var padLeft = require('./pad-left');
var padRight = require('./pad-right');

module.exports = function padKeys(arr) {
  var keys = Object.keys(arr);
  var paddedKeys = padRight(keys);
  var o = {};
  keys.forEach(function (key, i) {
    o[key] = paddedKeys[i];
  });
  return o;
};