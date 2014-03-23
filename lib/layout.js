/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var _ = require('lodash');
var file = require('fs-utils');



/**
 * Load a layout
 *
 * @api Public
 */

module.exports = function(verb) {
  var verbOpts = verb.options || {};

  return function(content, context, options) {
    options = options || {};
    context = context || {};

    var opts = _.extend({}, verbOpts, options);
    var layoutPath = path.join(opts.layouts, opts.layout);

    // Use a scaffold or template for the layout
    var layout = opts.layout || verb.scaffolds['html-layout'];

    // If a layout is user-defined, use that instead
    if(file.exists(layoutPath)) {
      layout = file.readFileSync(layoutPath);
    }

    var ctx = _.cloneDeep(verb.context, opts);
    context = _.extend(ctx, context, {content: content});

    return verb.template(layout, context);
  };
};