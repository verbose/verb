'use strict';

var helper = require('async-helper-base');
var example = require('./custom/example');
var reflinks = require('helper-reflinks');
var related = require('helper-related');

/**
 * Transform for loading default async helpers
 */

module.exports = function async_(verb) {
  verb.asyncHelper('reflinks', reflinks);
  verb.asyncHelper('related', related());
  verb.asyncHelper('example', helper('example', example));
  verb.asyncHelper('include', helper('include'));
  verb.asyncHelper('badge', helper('badge'));
  verb.asyncHelper('docs', helper('doc'));
};
