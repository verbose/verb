'use strict';

var File = require('vinyl');

/**
 * Convert a `template` object to a Vinyl file object.
 *
 * ```js
 * var file = utils.toVinyl(template);
 * ```
 *
 * @name toVinyl
 * @param  {Object} `file` Object with properties expected by Template
 * @return {Object} Vinyl file object
 * @api public
 */

module.exports = function toVinyl_(template) {
  template.locals = template.locals || {};

  var file = new File({
    cwd: template.cwd || template.locals.cwd,
    base: template.base || template.locals.base,
    path: template.path,
  });

  if (template.content) {
    file.contents = new Buffer(template.content);
  }

  // create string props
  setProps(file, template, ['ext', 'id']);
  // create object props
  setProps(file, template, ['options', 'locals', 'data'], {});
  return file;
};

/**
 * Add properties to the given object.
 *
 * @param  {Object} `file`
 * @param  {Object} `template`
 * @param  {Array} `props` Array of properties to add
 * @param  {*} `fallback` optionally pass a default value to fall back to.
 * @return {Object}
 */

function setProps(file, template, props, fallback) {
  props = Array.isArray(props) ? props : [props];
  var len = props.length;
  var i = 0;

  while (len--) {
    var prop = props[i++];
    if (template.hasOwnProperty(prop)) {
      file[prop] = template[prop];

    } else if (fallback) {
      file[prop] = fallback;

    } else {
      continue;
    }
  }
}
