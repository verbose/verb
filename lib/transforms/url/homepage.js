'use strict';

/**
 * This is called in the `urls` transform. Adds the homepage
 * from package.json to the `urls.homepage` property.
 *
 * To get the url:
 *
 * ```js
 * verb.get('data.urls.homepage');
 * ```
 * Or in templates:
 *
 * ```md
 * {%= urls.homepage %}
 * ```
 */

module.exports = function(verb) {
  verb.set('data.url.homepage', verb.get('data.homepage'));
};
