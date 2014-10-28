'use strict';

var repeat = require('repeat-string');
var longest = require('longest');

module.exports = function padRight(arr) {
  var lg = longest(arr);
  var len = arr.length;
  var res = [];
  var i = 0;

  while (i < len) {
    var curr = arr[i++];
    var diff = lg.length - curr.length;
    res.push(curr += repeat(' ', diff));
  }
  return res;
};