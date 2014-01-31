// node_modules
var frep = require('frep');
var _    = require('lodash');

// Local libs
var patterns = require('./patterns').escapeTemplates;

// Post-process content with RegExp replacement patterns
var postProcess = module.exports = function (str, options) {
  var opts = _.extend({}, options);
  var replacements = _.union([], patterns, opts.replacements);
  return frep.strWithArr(str, replacements);
};