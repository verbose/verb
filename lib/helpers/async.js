'use strict';

var helper = require('async-helper-base');
var example = require('./custom/example');
var reflinks = require('helper-reflinks');
var related = require('helper-related');

/**
 * Transform for loading default async helpers
 */

module.exports = function(app) {
  app.asyncHelper('reflinks', reflinks);
  app.asyncHelper('related', related());
  app.asyncHelper('example', helper('example', example));
  app.asyncHelper('include', helper('include'));
  app.asyncHelper('badge', helper('badge'));
  app.asyncHelper('docs', helper('doc'));
};
