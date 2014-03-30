/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const _ = require('lodash');

module.exports = function(verb) {

  exports.getAuthors = function(prop) {
    var authors = verb.context.authors || [];
    authors = _.flatten(authors);
    if(prop) {
      authors = _.pluck(authors, prop);
    } else {
      authors = authors;
    }
    verb.context.authors = authors;
    return authors;
  };

  _.mixin(exports);
  return exports;
};