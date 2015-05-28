'use strict';

/**
 * Create built-in template types, using the `base` loader
 */

module.exports = function(app) {
  app.create('example', {isRenderable: true}, ['base']);
  app.create('include', {isRenderable: true}, ['base']);
  app.create('badge', {isRenderable: true}, ['base']);
  app.create('doc', {isRenderable: true}, ['base']);
};
