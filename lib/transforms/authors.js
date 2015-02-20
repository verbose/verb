'use strict';

var parse = require('parse-author');

module.exports = function author(verb) {
  var data = verb.cache.data;
  var repo = typeof data.repository === 'object'
    ? data.repository.url
    : data.repository;

  if (typeof data.authors === 'undefined' && contains(repo)) {
    verb.data({
      authors: [
        {name: 'Jon Schlinkert', username: 'jonschlinkert'},
        {name: 'Brian Woodward', username: 'doowb'}
      ]
    });
  }
};


var whitelist = ['jonschlinkert', 'doowb', 'assemble', 'verb', 'helpers'];
function contains(str) {
  var len = whitelist.length;
  while(len--) {
    var ele = whitelist[len];
    if (!!~str.indexOf(ele)) {
      return true;
    }
  }
  return false;
}