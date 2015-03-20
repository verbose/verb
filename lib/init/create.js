'use strict';

/**
 * Create built-in template types, using the `base` loader
 */

module.exports = function create_(verb) {
  this.create('include', {isRenderable: true}, ['base']);
  this.create('badge', {isRenderable: true}, ['base']);
  this.create('doc', {isRenderable: true}, ['base']);
};
