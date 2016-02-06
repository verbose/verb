'use strict';

var path = require('path');
var merge = require('mixin-deep');
var util = require('generator-util');
var glob = require('matched');

module.exports = function(app, configfile) {
  var configname = path.basename(configfile, path.extname(configfile));
  var configfiles = glob.sync(configname + '.*', {cwd: app.cwd});
  var len = configfiles.length;
  var idx = -1;
  var res = {};

  while (++idx < len) {
    var name = configfiles[idx];
    var ext = path.extname(name);

    var configpath = path.resolve(app.cwd, name);
    if (ext === '.json') {
      merge(res, require(configpath));
    }
  }
  return res;
};
