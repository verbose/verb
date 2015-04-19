'use strict';

/**
 * Create built-in template types, using the `base` loader
 */

module.exports = function create_(verb) {
  verb.create('example', {isRenderable: true}, ['base']);
  verb.create('include', {isRenderable: true}, ['base']);
  verb.create('badge', {isRenderable: true}, ['base']);
  verb.create('doc', {isRenderable: true}, ['base']);
};
