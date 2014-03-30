/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const file = require('fs-utils');
const _ = require('lodash');

/**
 * Load layouts
 *
 * @api Public
 */

module.exports = function(verb) {
  verb.options = verb.options || {};

  return function(content, context, options) {
    options = options || {};
    context = context || {};

    var opts = _.extend({}, verb.options, options);
    var layoutPath = [opts.layouts, opts.layout].join('/');

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