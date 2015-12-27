'use strict';

var utils = require('../utils');
var config = require('../config');
var templates = require('./templates');
var defaults = require('./defaults');
var context = require('./context');
var cli = require('./cli');

module.exports = function preload(verb, base, env) {
  verb.use(utils.ask({storeName: 'verb'}));
  verb.use(utils.loader());

  defaults(verb, base, env);
  verb.use(templates(base, env));

  context(verb, base, env);
  config(verb, base, env);
  cli(verb, base, env);

  verb.use(utils.list('apps', {method: 'app'}));

  verb.on('register', function(name, app) {
    context(verb, base, env);
    defaults(app, base, env);
    app.use(templates(base, env));
  });

  verb.questions.on('ask', function(key, question, answers) {
    if (!verb.pkg.get('description') && key === 'description') {
      question.options.skip = true;
    }

    // console.log(question.isAnswered())
    // if (verb.store.has(key) && question) {
    //   verb.questions.setData(key, verb.store.get(key));
    // }
  });

  verb.questions.on('answer', function(key, answer) {
    // console.log(arguments)
    // if (/author\./.test(key)) {
    //   // verb.store.set()
    // }
  });
};
