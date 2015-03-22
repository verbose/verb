'use strict';

var mapFiles = require('map-files');
var utils = require('../utils');

module.exports = function base_(args) {
  var hasOpts = typeof args[1] === 'object';
  if (hasOpts) args[1].renameKey = utils.renameKey;
  if (hasOpts && args[1].hasOwnProperty('content')) {
    return normalize(args);
  }
  return mapFiles.apply(mapFiles, args);
};

function normalize(args) {
  var fp = args[0];
  var o = args[1];
  var name = utils.basename(fp);
  o.path = fp;
  var res = {};
  res[name] = o;
  return res;
}
