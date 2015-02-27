'use strict';

var chalk = require('chalk');

exports.jscomments = function () {
  return console.log(chalk.red('support for {%= jscomments() %} was removed in verb v0.3.0. use `apidocs` instead.'));
};

exports.contrib = function () {
  return console.log(chalk.red('support for {%= contrib() %} was removed in verb v0.3.0. use `include` instead.'));
};
