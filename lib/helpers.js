'use strict';

var utils = require('./utils');

module.exports = function (app) {
  app.asyncHelper('related', require('helper-related')(app.options));
  app.asyncHelper('reflinks', require('helper-reflinks'));

  app.helper('date', function () {
    return new Date();
  });

  app.helper('log', function (msg) {
    console.log.apply(console, arguments);
  });

  app.helper('trim', function (str) {
    return str.trim();
  });

  app.helper('apidocs', function () {
    // app.ask(locals)
  });
};
