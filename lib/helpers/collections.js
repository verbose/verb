'use strict';

var _ = require('lodash');

/**
 * Transform for loading helper collections
 *
 *  - Loads template-helpers
 *  - Loads logging-helpers
 *  - Exposes markdown-utils as helpers
 *
 * ```js
 * {%= mdu.link(author.name, author.url) %}
 * ```
 */

module.exports = function collections_(verb) {
  var helpers = require('template-helpers');
  verb.helpers({mdu: require('markdown-utils')});
  verb.helpers(_.omit(helpers._, Object.keys(helpers.path)));
  verb.helpers(require('logging-helpers'));
};
