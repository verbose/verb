'use strict';


module.exports = function (app) {
  if (!app.isApp) return;

  var utils = require('./utils');
  var config = require('base-config');
  app.use(config());

  app.config
    .map('collections', function(val) {
      app.visit('create', val);
    })
    .map('addViews')
    .map('addView')
    .map('helpers')
    .map('asyncHelpers')
    .map('data', function(val) {
      app.visit('data', val);
    })
    .map('reflinks', function(val) {
      app.data({reflinks: val});
    })
    .map('related', function(val) {
      app.data({related: val});
    });

};
