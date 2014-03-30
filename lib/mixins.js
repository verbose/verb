/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');

/**
 * Export mixins
 *
 * @name mixins
 * @param {Object} options
 * @return {Object}
 * @api private
 */

!(function (ctx) {
  var _fn = require(path.join(__dirname, 'utils/index.js'));

  // CommonJS
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = _fn;
    }
    exports._fn = _fn;
  }

  // AMD
  if (typeof define === 'function' && define.amd) {
    define('verb.mixins', [], function () {
      return _fn;
    });
  }

  ctx._ = ctx._ || {};
  ctx._.fn = ctx._.fn = _fn;

})(this);