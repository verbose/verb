'use strict';

/**
 * Load default settings
 */

module.exports = function plugins_(verb) {
  // default `src` plugins
  this.enable('src:init plugin');
  this.enable('src:assets plugin');
  this.enable('src:drafts plugin');

  // default `dest` plugins
  this.enable('dest:paths plugin');
  this.enable('dest:render plugin');
  verb.enable('dest:readme plugin');
};
