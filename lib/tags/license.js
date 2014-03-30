/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const minimatch = require('minimatch');
const file = require('fs-utils');
const _ = require('lodash');
const licenses = require('repo-licenses');

module.exports = function (verb) {
  var context = verb.context;
  verb.options = verb.options || {};
  verb.options.license = verb.options.license || {};

  var message = {
    prepend: 'Released under the '
  };

  exports.license = function (name, options) {
    var opts = _.extend(message, verb.options.license, options);

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
      if (context.licenses) {
        return opts.prepend + _.pluck(context.licenses, "type").join(", ") + " license" + (context.licenses.length === 1 ? '' : 's');
      } else if (context.license) {
        if (typeof context.license === 'object') {
          return opts.prepend + context.license.type + " license";
        }
        if (typeof context.license === 'string') {
          return opts.prepend + context.license + " license";
        }
      }
    } catch (e) {
      e.origin = __filename;
      verb.verbose.warn('No "license" or "licenses" properties found.', e);
    }
  };

  return exports;
};