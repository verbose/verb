/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

module.exports = function (context, prefix) {
  context = context || {};
  context.contributors = context.contributors || [];
  prefix = prefix || '* ';

  if(context.contributors) {
    return context.contributors.map(function(contributor) {
      return prefix + contributor.name || 'Name not found';
    }).join('\n');
  } else {
    console.warn('_(No contributors found)_');
  }
};