'use strict';

/**
 * This is called in the `urls` transform. Adds the bugs
 * from package.json to the `urls.bugs` property.
 *
 * To get the url:
 *
 * ```js
 * verb.get('data.urls.bugs');
 * ```
 * Or in templates:
 *
 * ```md
 * {%= urls.bugs %}
 * ```
 */

module.exports = function(verb) {
  var url = verb.get('data.bugs.url');
  verb.set('data.url.bugs', url);
};
