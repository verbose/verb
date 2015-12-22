'use strict';

var utils = require('../utils');

module.exports = function(verb, base, env) {
  var apidocs = require('helper-apidocs');
  var issue = require('helper-issue');

  verb.helper('log', function(msg) {
    console.log.apply(console, arguments);
  });

  verb.helper('require', function(name) {
    return utils.tryRequire(name);
  });

  verb.helper('get', function(key) {
    return utils.get(this.context, key);
  });

  verb.helper('shield', function(type) {
    return 'https://img.shields.io/' + type + '/{%= author.username %}/{%= name %}.svg';
  });

  verb.helper('date', require('helper-date'));
  verb.helper('issue', function(options) {
    var opts = utils.extend({}, options);
    opts.owner = opts.owner || utils.get(this, 'context.author.username');
    opts.repo = this.context.name;
    return issue(opts);
  });

  verb.helper('apidocs', apidocs({delims: ['{%', '%}']}));
  verb.helper('copyright', require('helper-copyright')({
    linkify: true
  }));

  verb.asyncHelper('related', utils.related({verbose: true}));
  verb.asyncHelper('reflinks', utils.reflinks({verbose: true}));
};
