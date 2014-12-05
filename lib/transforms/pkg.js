'use strict';

var path = require('path');

module.exports = function pkg(app) {
  app.data('package.json', function(fp) {
    return require(path.resolve(fp));
  });
};