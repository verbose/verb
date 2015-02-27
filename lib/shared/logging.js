'use strict';

var chalk = require('chalk');
var symbol = require('log-symbols');

exports.success = function (msg, fp) {
  var text = chalk.gray(msg.trim()) + (fp ? (' ' + fp) : '');
  console.log('  ' + symbol.success + '  ' + text);
};

exports.info = function (msg, fp) {
  var text = chalk.gray(msg.trim()) + (fp ? (' ' + fp) : '');
  console.log('  ' + symbol.info + '  ' + text);
};