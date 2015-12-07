'use strict';

var utils = require('../utils');
var config = require('../config');
var templates = require('./templates');
var defaults = require('./defaults');
var cli = require('./cli');

module.exports = function preload(verb, base, env) {
  verb.use(utils.ask());
  verb.use(utils.loader());

  defaults(verb, base, env);
  verb.use(templates());

  config(verb);
  cli(verb);

  // bubble up errors to `base` instance, set defaults
  verb.on('register', function(name, app) {
    defaults(app, base, env);
    app.use(templates());
  });
};
