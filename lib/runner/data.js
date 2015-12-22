'use strict';

var expandPkg = require('../expand');
var utils = require('../utils');

module.exports = function(verb, base, env) {
  verb.data({year: new Date().getFullYear()});
  verb.data({
    runner: {
      name: 'verb',
      url: 'https://github.com/verbose/verb'
    },
    verb: {
      reflinks: [],
      related: {list: []},
      sections: {}
    }
  });
};

module.exports.updateData = function(verb) {
  verb.questions.enqueue('author', 'name', 'description');

  var pkg = verb._pkg;
  var config = pkg.verb || {};

  // load package.json data and user options onto `verb.cache.data`
  verb.option(config.options || {});
  verb.data(pkg);

  var config = verb.pkg.get('verb.data') || {};
  config = utils.defaults(config, verb.cache.data);
  return expandPkg(verb, config);
};
