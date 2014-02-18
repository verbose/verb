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
var licenses = require('repo-licenses');


module.exports = function (phaser) {
  var config = phaser.config;
  var phaserOpts = phaser.options || {};
  phaserOpts.license = phaserOpts.license || {};

  var message = {
    prepend: 'Released under the '
  };

  exports.license = function (name, options) {
    var opts = _.extend(message, phaserOpts.license, options);

    if(typeof name === 'object') {
      options = name;
      name = null;
    }

    if(typeof name === 'string') {
      var filepaths = _.filter(licenses, function (filepath) {
        return file.basename(filepath) === name;
      });

      // if no matches, then try minimatch
      if (!filepaths || filepaths.length <= 0) {
        filepaths = licenses.filter(minimatch.filter(name));
      }

      return filepaths.map(function(filepath) {
        var content = file.readFileSync(filepath);
        return content;
      });
    }

    try {
      if (config.licenses) {
        return opts.prepend + _.pluck(config.licenses, "type").join(", ") + " license" + (config.licenses.length === 1 ? '' : 's');
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