'use strict';

var helper = require('../helper');

/**
 * Load default async helpers
 */

module.exports = function async_(verb) {
  verb.asyncHelper('apidocs', require('template-helper-apidocs')(verb));
  verb.asyncHelper('reflinks', require('helper-reflinks'));
  verb.asyncHelper('related', require('helper-related')());
  verb.asyncHelper('include', helper(verb)('include'));
  verb.asyncHelper('badge', helper(verb)('badge'));
  verb.asyncHelper('docs', helper(verb)('doc'));
};
