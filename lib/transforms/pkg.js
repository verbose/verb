'use strict';

var path = require('path');

module.exports = function pkg(verb) {
  verb.data('package.json', function(fp) {
    return require(path.resolve(fp));
  });
};