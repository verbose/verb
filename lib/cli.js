'use strict';

module.exports = function(app) {
  app.cli
    .map('save', function(key, val) {
      console.log(key, val)
    })
    .map('data', function(val) {
      app.visit('data', val);
    })
    .map('cwd', function(fp) {
      app.option('cwd', fp);
    });

  app.define('commands', app.cli.keys);
};

