'use strict';

var utils = require('../utils');

module.exports = function(verb, base, env) {
  verb.asyncHelper('apidocs', function(name, cb) {
    // console.log(arguments);
    cb(null, '');
  });

  verb.helper('log', function(msg) {
    console.log.apply(console, arguments);
  });

  verb.helper('shield', function(name) {
    return 'https://img.shields.io/' + name + '/{%= repo %}.svg';
  });

  verb.helper('date', require('helper-date'));
  verb.asyncHelper('related', utils.related({verbose: true}));
  verb.asyncHelper('reflinks', utils.reflinks({verbose: true}));
  verb.helper('copyright', require('helper-copyright')({
    linkify: true
  }));
};
