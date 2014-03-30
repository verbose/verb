const path = require('path');
const _ = require('lodash');

module.exports = function (arr, patterns, options) {
  options = _.extend({ext: '.md'}, options || {});

  return arr.filter(function (filepath) {
    var basename = path.basename(filepath);
    return basename === patterns + options.ext;
  });
};

