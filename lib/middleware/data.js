'use strict';

var path = require('path');
var _ = require('lodash');

module.exports = function (verb) {
  return function (file, next) {
    file.data = _.extend({}, verb.cache.data, file.data);
    file.ext = path.extname(file.path);
    next();
  };
};
