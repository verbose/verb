'use strict';

var url = require('url');

module.exports = function username(str) {
  var pathname = url.parse(str).pathname;
  var segments = pathname.split('/').filter(Boolean);
  return segments[0];
};