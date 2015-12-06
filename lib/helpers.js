'use strict';

var utils = require('./utils');

module.exports = function(verb, base, env) {
  verb.asyncHelper('apidocs', function(name, cb) {
    console.log(arguments)
    cb(null, '');
  });

  verb.helper('shield', function(name) {
    return 'https://img.shields.io/' + name + '/{%= repo %}.svg';
  });

  verb.asyncHelper('related', utils.related({verbose: true}));
  verb.asyncHelper('reflinks', utils.reflinks({verbose: true}));
  verb.helper('copyright', require('helper-copyright')({
    linkify: true
  }));

  verb.helper('date', function() {
    return new Date();
  });
};
