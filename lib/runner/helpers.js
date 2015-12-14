'use strict';

var utils = require('../utils');

module.exports = function(verb, base, env) {
  var apidocs = require('helper-apidocs');

  verb.helper('log', function(msg) {
    console.log.apply(console, arguments);
  });

  verb.helper('get', function(key) {
    return utils.get(this.context, key);
  });

  verb.helper('shield', function(type) {
    return 'https://img.shields.io/' + type + '/{%= author.username %}/{%= name %}.svg';
  });

  verb.helper('apidocs', apidocs({
    delims: ['{%', '%}']
  }));
  verb.helper('date', require('helper-date'));
  verb.helper('copyright', require('helper-copyright')({
    linkify: true
  }));

  verb.asyncHelper('related', utils.related({verbose: true}));
  verb.asyncHelper('reflinks', utils.reflinks({verbose: true}));
};
