'use strict';

var utils = require('../utils');
var config = require('../config');
var expand = require('../expand');
var templates = require('./templates');
var defaults = require('./defaults');
var cli = require('./cli');

module.exports = function preload(verb, base, env) {
  verb.use(utils.ask());
  verb.use(utils.loader());

  defaults(verb, base, env);
  verb.use(templates());

  config(verb, base, env);
  cli(verb, base, env);

  verb.use(utils.list('verbApps', {
    method: 'verbApp'
  }));

  verb.on('register', function(name, app) {
    var toc = verb.get('env.user.pkg.verb.toc');
    if (typeof toc === 'undefined') {
      verb.set('env.user.pkg.verb.toc', {insert: true});
    }

    defaults(app, base, env);
    app.use(templates());
    app.use(expand());
  });
};
