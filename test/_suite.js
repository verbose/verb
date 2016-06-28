'use strict';

var generate = require('..');
var runner = require('base-test-runner')();
var suite = require('base-test-suite');

/**
 * Run the tests in `base-test-suite`
 */

runner.on('templates', function(file) {
  var fn = require(file.path);
  if (typeof fn === 'function') {
    fn(generate);
  } else {
    throw new Error('expected ' + file.path + ' to export a function');
  }
});

runner.addFiles('templates', suite.test.templates);
runner.addFiles('templates', suite.test['assemble-core']);
