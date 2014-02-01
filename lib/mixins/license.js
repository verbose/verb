/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var _ = require('lodash');

module.exports = function(config, options) {
  return function (prepend) {
    prepend = prepend || "Released under the ";
    var licenses = config.licenses;

    try {
      if(licenses) {
        return prepend + _.pluck(licenses, "type").join(", ") + " license" + (licenses.length === 1 ? '' : 's');
      } else if(config.license) {
        if(typeof config.license === 'object') {
          return prepend + config.license.type + " license";
        }
        if(typeof config.license === 'string') {
          return prepend + config.license + " license";
        }
      }
    } catch(e) {
      e.origin = __filename;
      e.message = 'No "license" or "licenses" properties found.';
      console.warn(e);
    }
  };
};