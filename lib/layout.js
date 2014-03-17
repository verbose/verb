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
 * Load layouts
 *
 * @return {Object}
 * @api Public
 */

module.exports = function(verb) {
  var verbOpts = _.extend({}, verb.options);

  return function(content, context, options) {
    var opts = _.extend(verbOpts, options);
    var layoutPath = path.join(opts.layouts, opts.layout);
    var layout = verb.scaffolds['layout'];

    // If a layout is user-defined, use that instead
    if(file.exists(layoutPath)) {
      layout = file.readFileSync(layoutPath);
    }

    var ctx = _.extend(context, {content: content});
    return verb.template(layout, ctx);
  };
};