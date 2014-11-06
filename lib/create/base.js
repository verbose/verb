'use strict';

var path = require('path');
var debug = require('debug')('verb:create');
var mapFiles = require('map-files');

module.exports = function (app, options) {
  return function(name, cwd) {
    debug('creating subtype: ', name);

    app.create(name, options, [
      function (patterns, next) {
        var fp = path.join(cwd, patterns);
        debug('subtype ' + name + ' loading: ', fp);
        next(null, mapFiles(fp, options));
      }
    ], function (err) {
      if (err) console.log(err);
      debug('subtype' + name + 'error: ', err);
    });
  };
};