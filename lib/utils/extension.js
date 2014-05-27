const relative = require('relative');
const resolve = require('resolve-dep');
const _ = require('lodash');

module.exports = function(type, builtins, verb) {
  function relativePath(filepath) {
    return relative(verb.cwd(), filepath);
  }

  // Look for extensions defined on verb.options
  verb.options = verb.options || {};
  verb.options[type] = verb.options[type] || [];

  // Look for extensions defined on verb.page.data
  verb.page = verb.page || {};
  verb.page.data = verb.page.data || {};
  verb.page.data[type] = verb.page.data[type] || [];

  // Look for extensions defined on verb.page.options
  verb.page.data.options = verb.page.data.options || {};
  verb.page.data.options[type] = verb.page.data.options[type] || [];

  var locations = _.flatten([
    builtins,
    verb.options[type],
    verb.page.data[type],
    verb.page.data.options[type]
  ]).map(relativePath);

  _.forEach(resolve(locations), function(extension) {
    var fn = {};
    try {
      _.extend(fn, require(extension)(verb));
    } catch(err) {}
      _.merge(verb.context, fn);
  });
  return verb;
};