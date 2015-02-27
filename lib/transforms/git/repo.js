'use strict';

var remote = require('remote-origin-url');

/**
 * Called in the `urls` transform. Adds the full
 * git remote origin URL to `verb.cache.data.urls.git`.
 *
 * To get the url:
 *
 * ```js
 * verb.get('data.urls.git');
 * ```
 * Or in templates:
 *
 * ```js
 * {%= urls.git %}
 * // or
 * {%= git.remote %}
 * ```
 */

module.exports = function(verb) {
  var url = verb.get('data.repository.url') || verb.get('data.repository');
  try {
    url = remote.sync();
  } catch(err) {}

  if (url && typeof url === 'object' && url.url) {
    url = url.url;
  }
  verb.set('data.url.git', url);
  verb.set('data.git.remote', url);
};
