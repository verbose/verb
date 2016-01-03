'use strict';

var utils = require('../utils');
var config = require('../config');
var templates = require('./templates');
var defaults = require('./defaults');
var context = require('./context');
var cli = require('./cli');

module.exports = function preload(verb, base, env) {
  verb.use(utils.ask({ storeName: 'verb' }));
  verb.use(utils.loader());

  defaults(verb, base, env);
  templates(verb, base, env);

  context(verb, base, env);
  config(verb, base, env);
  cli(verb, base, env);

  verb.use(utils.list('apps', { method: 'app' }));

  verb.questions.on('ask', function(key, question, answers) {
    if (!verb.pkg.get('description') && key === 'description') {
      question.options.skip = true;
    }
  });
};
