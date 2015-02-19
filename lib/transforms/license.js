'use strict';

/**
 * Normalize repo data
 */

module.exports = function license(verb) {
  var data = verb.cache.data;
  if (data.repository && data.repository.url) {
    try {
      if (contains(data.repository.url)) {
        if (data.license && typeof data.license !== 'function') {
          verb.cache.data.licenses = [data.license];
          delete verb.cache.data.license;
        }
      }
    } catch (err) {
      console.log(err);
    }
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