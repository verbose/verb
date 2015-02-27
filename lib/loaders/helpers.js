'use strict';

var debug = require('debug')('verb:loader:helpers');

module.exports = function(verb) {
  debug('loading helpers: %j', arguments);
  var name;

  var helpers = Object.keys(verb.fns.helpers);
  var len = helpers.length;
  var i = 0;

  while (i < len) {
    name = helpers[i++];
    verb.helper(name, verb.fns.helpers[name]);
  }

  var async = Object.keys(verb.fns.async);
  var alen = async.length;
  var j = 0;

  while (j < alen) {
    name = async[j++];
    verb.asyncHelper(name, verb.fns.async[name]);
  }
  return verb;
};