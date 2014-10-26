'use strict';

var path = require('path');
var lookup = require('./lookup');
var isFile = require('./is-file');
var camelize = require('./camelize');

lookup(__dirname, false).forEach(function (name) {
  var fp = path.resolve(__dirname, name);

  if (!/index/.test(fp) && isFile(fp)) {
    exports[camelize(name)] = require(fp);
  }
});
