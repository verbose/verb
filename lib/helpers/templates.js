'use strict';

/**
 * Helpers for wrapping include templates to provide additional
 * context, logic or error handling
 */

module.exports = function templates_(verb) {
  verb.helpers(require('readme-includes').helpers + '/*.js');
  verb.helpers(require('readme-badges').helpers + '/*.js');
};
