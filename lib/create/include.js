'use strict';

var path = require('path');
var debug = require('debug')('verb:create:include');
var mapFiles = require('map-files');

module.exports = function(app, name, options) {
  debug('createing subtype :', name);

  app.create('includes', options, [
    function (patterns, next) {
      var includes = require('verb-readme-includes');
      var fp = path.join(includes, patterns);
      var res = mapFiles(fp, options);

      next(null, res);
    }
  ]);
};