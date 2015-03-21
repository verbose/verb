'use strict';

var parse = require('parse-github-url');

/**
 * Called in the `init` transform. Adds a ``
 * property to the context.
 *
 * @param  {Object} `verb`
 */

module.exports = function github_(verb) {
  var url = typeof verb.env.repository === 'object'
    ? verb.env.repository.url
    : verb.env.repository;
  verb.data({github: parse(url)});
};
