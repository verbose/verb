const path = require('path');
const plasma = require('plasma');
const _ = require('lodash');

module.exports = function(type, builtins, verb) {

  // Look for extensions defined on verb.options
  verb.options = verb.options || {};
  verb.options[type] = verb.options[type] || {};

  // Look for extensions defined on verb.page.data
  verb.page = verb.page || {};
  verb.page.data = verb.page.data || {};
  verb.page.data[type] = verb.page.data[type] || {};

  // Look for extensions defined on verb.page.options
  verb.page.data.options = verb.page.data.options || {};
  verb.page.data.options[type] = verb.page.data.options[type] || {};

  var locations = [
    builtins,
    verb.options[type],
    verb.page.data[type],
    verb.page.data.options[type]
  ];

  // Extend the context with any extensions found
  _.forEach(locations, function(location) {
    _.merge(verb.context, plasma.fn(location, { config: verb }));
  });
  return verb;
};