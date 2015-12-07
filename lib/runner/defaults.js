'use strict';

var middleware = require('./middleware');
var questions = require('./questions');
var helpers = require('./helpers');
var data = require('./data');

module.exports = function(app, base, env) {
  helpers(app, base, env);
  middleware(app, base, env);
  questions(app, base, env);
  data(app, base, env);
};
