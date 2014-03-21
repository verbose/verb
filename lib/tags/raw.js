/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');

module.exports = function (verb) {
  var verbOpts = verb.options || {};
  var utils = verb.utils;

  exports.raw = function (patterns, options) {
    var includes = require('verb-readme-includes');
    var name = patterns;

    if (typeof name === 'undefined') {
      throw new Error('{%= raw() %} tag name is undefined.');
    }

    var opts = _.extend({
      ext: '.md',
      sep: '\n',
      docs: verb.docs,
      glob: {
        filter: 'isFile',
        matchBase: true
      }
    }, options, verbOpts);

    var templates = [],
      optsIncludes = [],
      optsDocs = [];

    if(opts.includes) {
      optsIncludes = utils.lookup(opts.includes, name);
    }

    if(opts.docs) {
      optsDocs = utils.lookup(opts.docs, name);
    }

    if(!opts.knownDocs) {
      var base = path.join(opts.docs, '**/*');
      templates.push(utils.lookup(base, name));
    }

    if(!opts.knownIncludes) {
      templates.push(utils.lookup(includes, name));
    }

    templates.push(optsDocs);
    templates.push(optsIncludes);


    return _.flatten(templates).map(function(filepath) {
      return file.readFileSync(filepath);
    }).join(opts.sep);
  };

  return exports;
};

