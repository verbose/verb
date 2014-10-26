'use strict';

var path = require('path');
var lookup = require('../utils/lookup');
var isFile = require('../utils/is-file');
var camelize = require('../utils/camelize');

lookup(__dirname, false).forEach(function (name) {
  var fp = path.resolve(__dirname, name);

  if (!/index/.test(fp) && isFile(fp)) {
    exports[camelize(name)] = require(fp);
  }
});