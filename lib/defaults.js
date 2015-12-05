'use strict';

var middleware = require('./middleware');
var helpers = require('./helpers');
var utils = require('./utils');
var data = require('./data');

module.exports = function(app, base, env) {
  var plugins = base.get('env.argv.plugins');
  middleware(app, base, env);
  helpers(app, base, env);
  data(app, base, env);
};
