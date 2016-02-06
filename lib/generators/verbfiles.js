'use strict';

var path = require('path');
var utils = require('../utils');

module.exports = function(verb) {
  verb.register('verbfile', require('./verbfile'));
  verb.register('verbmd', require('./verbmd'));

  verb.task('verbfiles', function(cb) {
    utils.ask(verb, '.verb.md', cb);
  });

  verb.task('default', ['verbfiles']);
};
