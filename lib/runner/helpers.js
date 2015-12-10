'use strict';

var utils = require('../utils');

module.exports = function(verb, base, env) {
  verb.helper('apidocs', function(name) {
    // console.log(arguments);
    return;
  });

  verb.helper('log', function(msg) {
    console.log.apply(console, arguments);
  });

  verb.helper('get', function(key) {
    return utils.get(this.context, key);
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
