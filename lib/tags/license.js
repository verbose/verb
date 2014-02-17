/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var _ = require('lodash');

module.exports = function (phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var config = phaser.config;
  var licenses = config.licenses;

  exports.license = function (options) {
    var defaults = {prepend: 'Released under the '};
    var opts = _.extend(defaults, phaserOpts.license || {}, options);
    try {
      if (licenses) {
        return opts.prepend + _.pluck(licenses, "type").join(", ") + " license" + (licenses.length === 1 ? '' : 's');
      } else if (config.license) {
        if (typeof config.license === 'object') {
          return opts.prepend + config.license.type + " license";
        }
        if (typeof config.license === 'string') {
          return opts.prepend + config.license + " license";
        }
      }
    } catch (e) {
      e.origin = __filename;
      phaser.verbose.warn('No "license" or "licenses" properties found.', e);
    }
  };

  return exports;
};