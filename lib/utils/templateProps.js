'use strict';

var parsePath = require('./parsePath');

/**
 * Setup default properties and objects on a template object.
 *
 * @name templateProps
 * @param  {Object} `template` Template Object to add properties to.
 * @api public
 */

module.exports = function templateProps_(template) {
  // add default properties to template object
  template.options = template.options || {};
  template.locals = template.locals || {};
  template.data = template.data || {};

  // add default path properties to `template`
  template = parsePath(template);

  // add default engine to template.options
  template.options.engine = template.options.engine || template.ext;
};
