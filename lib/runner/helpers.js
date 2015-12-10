'use strict';

var utils = require('../utils');

module.exports = function(verb, base, env) {
  verb.helper('log', function(msg) {
    console.log.apply(console, arguments);
  });

  verb.helper('get', function(key) {
    return utils.get(this.context, key);
  });

  verb.helper('shield', function(name) {
    return 'https://img.shields.io/' + name + '/{%= repo %}.svg';
  });

  // verb.helper('codelinks', require('helper-codelinks')(verb));
  // verb.helper('multiToc', require('helper-toc')(verb.option('toc')));
  // verb.helper('coverage', require('helper-coverage'));
  verb.helper('date', require('helper-date'));
  verb.helper('apidocs', require('template-helper-apidocs'));
  verb.helper('copyright', require('helper-copyright')({
    linkify: true
  }));

  verb.asyncHelper('related', utils.related({verbose: true}));
  verb.asyncHelper('reflinks', utils.reflinks({verbose: true}));
};
