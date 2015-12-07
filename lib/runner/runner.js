'use strict';

var utils = require('../utils');
var config = require('../config');
var templates = require('./templates');
var defaults = require('./defaults');
var cli = require('./cli');

module.exports = function preload(verb, base, env) {
  verb.use(templates());
  verb.use(utils.ask());
  verb.use(config);
  verb.use(cli);

  defaults(verb, base, env);

  verb.on('prebuild', function(name, task, app) {
    var pkg = app.get('env.user.pkg') || {};
    app.config.process(pkg.verb);
  });

  // bubble up errors to `base` instance, set defaults
  verb.on('register', function(name, app) {
    defaults(app, app.base, app.env);
    app.use(templates());
  });
};
