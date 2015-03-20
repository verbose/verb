'use strict';

var _ = require('lodash');
var vinylProps = require('./vinylProps');
var templateProps = require('./templateProps');

/**
 * Convert a Vinyl file object to a non-vinyl template object.
 *
 * ```js
 * var template = utils.toTemplate(file);
 * ```
 *
 * @name toTemplate
 * @param  {Object} `file` Vinyl file object
 * @return {Object} Object with properties expected by Template or Template apps
 * @api public
 */

module.exports = function toTemplate_(file) {
  if (!file) {
    throw new Error('[template-utils] toTemplate expects `file` to be an object');
  }

  if (file.isNull()) {
    return {content: null, orig: null, data: {}};
  }

  _.extend(file, _.omit(file, vinylProps.blacklisted));
  templateProps(file);
  return file;
};
