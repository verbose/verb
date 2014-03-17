/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var minimatch = require('minimatch');
var file = require('fs-utils');
var _ = require('lodash');
var licenses = require('repo-licenses');


module.exports = function (verb) {
  var config = verb.config;
  var verbOpts = verb.options || {};
  verbOpts.license = verbOpts.license || {};

  var message = {
    prepend: 'Released under the '
  };

  exports.license = function (name, options) {
    var opts = _.extend(message, verbOpts.license, options);

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
      verb.verbose.warn('No "license" or "licenses" properties found.', e);
    }
  };

  return exports;
};