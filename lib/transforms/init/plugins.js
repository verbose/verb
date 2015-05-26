'use strict';

/**
 * Load default settings
 */

module.exports = function(app) {
  // default `src` plugins
  app.enable('src:vfs plugin');
  app.enable('src:init plugin');
  app.enable('src:conflicts plugin');
  app.enable('src:lint plugin');
  app.enable('src:drafts plugin');

  // default `dest` plugins
  app.enable('dest:todos plugin');
  app.enable('dest:paths plugin');
  app.enable('dest:render plugin');
  app.enable('dest:reflinks plugin');
  app.enable('dest:comments plugin');
  app.enable('dest:format plugin');
  app.enable('dest:vfs plugin');
};
