'use strict';

var utils = require('../../shared/utils');

/**
 * This is called in the `url` transform. Adds the github
 * repository URL to the `url.github` property.
 *
 * To get the url:
 *
 * ```js
 * verb.get('data.url.github');
 * ```
 * Or in templates:
 *
 * ```md
 * {%= url.github %}
 * ```
 */

module.exports = function(verb) {
  var git = verb.get('data.url.git');
  var url = '';
  if (typeof git === 'string') {
    url = utils.github(git);
  }
  verb.set('data.url.github', url);
};
