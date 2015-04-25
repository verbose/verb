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

module.exports = function collections_(verb) {
  verb.helpers(require('logging-helpers'));
  verb.helpers({fn: require('./custom/')});
  verb.helpers({console: console});
  verb.helpers({mdu: require('markdown-utils')});
  verb.helpers({mm: require('micromatch')});

  // remove `path` helpers from root and add them to `path.`
  var helpers = require('template-helpers');
  verb.helpers(_.omit(helpers._, Object.keys(helpers.path)));
  verb.helpers({path: helpers.path});
};
