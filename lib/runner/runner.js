'use strict';

var utils = require('./utils');
var templates = require('./templates');
var defaults = require('./defaults');
var config = require('./config');
var cli = require('./cli');

module.exports = function(verb) {
  verb.use(templates());
  verb.use(utils.ask());

  config(verb);
  cli(verb);

  defaults(verb, verb.base, verb.env);

  this.on('prebuild', function(name, task, app) {
    var pkg = app.get('env.user.pkg') || {};
    app.config.process(pkg.app);
  });

  // bubble up errors to `base` instance, set defaults
  this.on('register', function(name, app) {
    defaults(app, app.base, app.env);
    app.use(templates());
  });
};
