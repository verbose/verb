
var phaser = require('../index');

module.exports.register = function (options) {
  'use strict';

  var opts = {
    cwd: 'docs',
    ext: '.md',
    filters: 'test/filters/*.js',
    // Metadata is merged with package.json data
    data: {
      user: 'jonschlinkert'
    }
  };

  phaser.process(['README.tmpl.md'], './', opts);
};