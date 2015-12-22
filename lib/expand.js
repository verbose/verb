'use strict';

var utils = require('./utils');

/**
 * Adds get/set methods to verb env
 *
 * @param {Object} `verb` Instance of verb
 * @param {Object} `config` Verb config data from package.json
 */

module.exports = function(verb, config) {
  var pkg = verb.get('env.user.pkg');
  if (!pkg) return;

  var data = utils.extend({}, pkg);
  if (typeof pkg.author === 'string') {
    data.author = utils.parseAuthor(pkg.author);
  }

  data.author = formatAuthor(verb, data.author);

  var res = utils.defaults(config, data);
  res.license = formatLicense(res, verb.options);
  return res;
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

function formatAuthor(app, author) {
  var config = app.store.config;
  author = author || {};

  if (!author.username && author.url) {
    if (config.has('author.data.username')) {
      author.username = config.get('data.author.username');
    } else if (/github\.com/.test(author.url)) {
      var username = author.url.split('github.com').pop();
      author.username = username.replace(/^\W+|\W+$/g, '');
    }
  }
  return author;
}
