'use strict';

var _ = require('lodash');
var helpers = require('template-helpers');
var path = helpers.path;

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

  // remove `path` helpers from root and add them to `path.`
  verb.helpers(_.omit(helpers._, Object.keys(path)));
  verb.helpers({mdu:
    require('markdown-utils'),
    path: path
  });
};
