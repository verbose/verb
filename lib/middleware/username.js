'use strict';

var _ = require('lodash');
var url = require('url');

module.exports = function (verb) {
  return function (file, next) {
    file.data = file.data || {};

    var data = _.extend({}, verb.context, verb.cache.data, verb.cache._data, file.data);
    if (!data.hasOwnProperty('username')) {

      if (data.hasOwnProperty('repository') && data.repository.url) {
        var o = url.parse(data.repository.url);
        file.data.username = o.path.split('/').filter(Boolean)[0];
      }
    } else {
      file.data.username = null;
    }

    next();
  };
};
