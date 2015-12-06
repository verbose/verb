'use strict';

var middleware = require('./middleware');
var helpers = require('./helpers');
var data = require('./data');

module.exports = function(app, base, env) {
  middleware(app, base, env);
  helpers(app, base, env);
  data(app, base, env);
};
