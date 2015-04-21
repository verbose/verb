'use strict';

var helper = require('async-helper-base');
var example = require('./example');

/**
 * Transform for loading default async helpers
 */

module.exports = function async_(verb) {
  verb.asyncHelper('reflinks', require('helper-reflinks'));
  verb.asyncHelper('related', require('helper-related')());
  verb.asyncHelper('example', helper('example', example));
  verb.asyncHelper('include', helper('include'));
  verb.asyncHelper('badge', helper('badge'));
  verb.asyncHelper('docs', helper('doc'));
};
