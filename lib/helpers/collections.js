'use strict';

var _ = require('lodash');

/**
 * Transform for loading helper collections
 *
 *  - Loads template-helpers
 *  - Loads logging-helpers
 *  - Exposes markdown-utils as helpers
 *  - exposes path helpers on the `path.` property
 *
 * ```js
 * {%= mdu.link(author.name, author.url) %}
 * //=> [Jon Schlinkert](https://github.com/jonschlinkert)
 *
 * {%= path.extname("foo.md") %}
 * //=> '.md'
 * ```
 */

module.exports = function(app) {
  app.helpers({console: console});
  app.helpers(require('logging-helpers'));

  // namespaced helpers
  app.helpers({fn: require('./custom/')});
  app.helpers({mdu: require('markdown-utils')});
  app.helpers({mm: require('micromatch')});

  // remove `path` helpers from root and add them to `path.`
  var helpers = require('template-helpers');
  app.helpers(_.omit(helpers._, Object.keys(helpers.path)));
  app.helpers({path: helpers.path});
};
