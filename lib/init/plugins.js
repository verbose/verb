'use strict';

/**
 * Load default settings
 */

module.exports = function plugins_(verb) {
  verb.enable('src:init plugin');
  verb.enable('dest:render plugin');
  verb.enable('dest:readme plugin');
};
