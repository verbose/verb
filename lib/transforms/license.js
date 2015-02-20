'use strict';

/**
 * Normalize repo data
 */

module.exports = function license(verb) {
  var data = verb.cache.data;
  var repo = typeof data.repository === 'object'
    ? data.repository.url
    : data.repository;

  try {
    if (repo && contains(repo)) {
      if (data.license && typeof data.license !== 'function') {
        verb.cache.data.licenses = [data.license];
        delete verb.cache.data.license;
      }
    }
  } catch (err) {
    console.log(err);
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