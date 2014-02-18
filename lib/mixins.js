/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */


/**
 * Export mixins
 *
 * @name mixins
 * @param {Object} options
 * @return {Object}
 * @api private
 */

!(function (ctx) {
  var _fn = require('./utils/index');

  // console.log(utils);
  // CommonJS
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = _fn;
    }
    exports._fn = _fn;
  }

  // AMD
  if (typeof define === 'function' && define.amd) {
    define('phaser.mixins', [], function () {
      return _fn;
    });
  }

  ctx._ = ctx._ || {};
  ctx._.fn = ctx._.fn = _fn;

})(this);