'use strict';

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
  verb.helpers({mdu: require('markdown-utils')});
  verb.helpers(require('template-helpers')._);
  verb.helpers(require('logging-helpers'));
};
