var file = require('fs-utils');
var _ = require('lodash');

module.exports = function(patterns, name) {
  var files = file.expand(patterns);

  return _.flatten(files.filter(function(filepath) {
    var match = file.match(name+'*', filepath, {matchBase: true});
    return !_.isEmpty(match) ? match : '';
  }));
};