'use strict';

var utils = require('../shared/utils');

module.exports = function nickname(verb) {
  var name = verb.get('data.name');

  if (utils.contains(name, 'helper-')) {
    name = name.slice(7);
  }

  if (utils.contains(name, 'transform-')) {
    name = name.slice(10);
  }

  if (utils.contains(name, 'route-')) {
    name = name.slice(6);
  }

  if (utils.contains(name, 'plugin-')) {
    name = name.slice(7);
  }

  // TODO: deprecate nickname
  verb.set('data.nickname', name);
  verb.set('data.shortname', name);
};
