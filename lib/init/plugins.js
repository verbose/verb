'use strict';

/**
 * Load default settings
 */

module.exports = function plugins_(verb) {
  // default `src` plugins
  verb.enable('src:vfs plugin');
  verb.enable('src:init plugin');
  verb.enable('src:drafts plugin');

  // default `dest` plugins
  verb.enable('dest:todos plugin');
  verb.enable('dest:paths plugin');
  verb.enable('dest:render plugin');
  verb.enable('dest:vfs plugin');
};
