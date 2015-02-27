'use strict';

var extend = require('extend-shallow');
var debug = require('debug')('verb:loader:types');
var load = require('load-plugins');

module.exports = function (verb) {
  return function (type, collection) {
    debug('loading type: %s', type);

    verb.fns[collection] = verb.fns[collection] || {};
    extend(verb.fns[collection], load(type + '*', {
      cwd: process.cwd(),
      strip: type
    }));

    return verb.fns[collection];
  };
};