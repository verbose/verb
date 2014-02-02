
var glob = require('globule');
var _ = require('lodash');

var expand = module.exports = function (src, options) {
  options = _.extend({sep: '\n', prefixBase: true}, options);
  options.cwd = options.cwd || process.cwd();
  return glob.find(src, options);
};
