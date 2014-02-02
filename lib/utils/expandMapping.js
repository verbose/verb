


var glob = require('globule');
var file = require('fs-utils');
var _ = require('lodash');

var phaser

var expand = module.exports = function(src, dest, options) {
  // Options defaults
  var opts = _.defaults({cwd: 'docs', ext: '.md'}, options);

  // Globule defaults
  var globOpts = {
    flatten: true,
    matchBase: true,
    prefixBase: false,
    srcBase: opts.cwd,
    destBase: dest,
    ext: opts.ext
  };

  return glob.findMapping(src, globOpts);
};