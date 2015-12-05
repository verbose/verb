'use strict';

var utils = require('./utils');

module.exports = function(app, base, env) {
  app.asyncHelper('apidocs', function(name, cb) {
    console.log(arguments)
    cb(null, '');
  });

  app.asyncHelper('related', utils.related({verbose: true}));
  app.asyncHelper('reflinks', utils.reflinks({verbose: true}));
  app.helper('copyright', require('helper-copyright')({
    linkify: true
  }));

  app.helper('date', function() {
    return new Date();
  });
};
