'use strict';

var utils = require('./utils');

module.exports = function (app) {
  if (!app.isVerb) return;
  app.use(utils.config());

  app.config
    .map('collections', function(val) {
      app.visit('create', val);
    })
    .map('addViews')
    .map('plugins')
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
