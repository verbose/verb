'use strict';

var parse = require('parse-author');
var utils = require('../utils');

module.exports = function author(verb) {
  var author = verb.get('data.author');
  var data = verb.get('data');

  if (author && typeof author === 'string') {
    verb.set('data.author', parse(author));
  }
};
