'use strict';

var utils = require('./utils');

/**
 * Adds get/set methods to verb env
 */

module.exports = function(options) {
  return function(verb) {
    var pkg = verb.get('env.user.pkg');
    if (!pkg) return;

    var exp = utils.extend({}, pkg);
    if (typeof pkg.author === 'string') {
      exp.author = utils.parseAuthor(pkg.author);
    }

    verb.base.set('cache.expanded', exp);
  };
};
