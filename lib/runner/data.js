'use strict';

module.exports = function(verb, base, env) {
  verb.data({
    runner: {
      name: 'verb',
      url: 'https://github.com/verbose/verb'
    },
    verb: {
      reflinks: [],
      related: {
        list: []
      }
    }
  });
};

module.exports.updateData = function(app, base, env) {
  app.questions.enqueue('author', 'name', 'description');

  var plugins = app.get('env.argv.plugins') || app.plugins;
  var pkg = env.user.pkg;
  var config = pkg.app || {};

  app.option(config.options || {});

  // load package.json data and user options onto `app.cache.data`
  app.data({options: app.options});
  app.data(pkg);
  app.data(app.base.get('cache.expanded') || {});
  app.data({license: formatLicense(pkg, app.options)});
};

/**
 * Format license
 */

function formatLicense(pkg, options) {
  options = options || {};
  if (typeof options.license === 'string') {
    return options.license;
  }
  var str = pkg.license;
  if (Array.isArray(pkg.licenses)) {
    str = pkg.licenses[0];
  }
  if (typeof str === 'undefined') {
    return '';
  }
  return 'Released under the ' + str + ' license.';
}

