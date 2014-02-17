/**
 * phaser <https://github.com/jonschlinkert/phaser>
 * The most deadly markdown documentation generator in the Alpha Quadrant.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var _ = require('lodash');
var file = require('fs-utils');


/**
 * Default layout to use when one isn't
 * defined in the options.
 *
 * @return {String}
 * @api Public
 */

var defaultLayout = [
  '<!doctype html>',
  '<html lang="en">',
  '  <head>',
  '    {%= include("header") %}',
  '  </head>',
  '  <body>',
  '    <div class="container bs-docs-container">',
  '      {%= content %}',
  '    </div>',
  '  </body>',
  '</html>'
].join('\n');


/**
 * Load layouts
 *
 * @return {Object}
 * @api Public
 */

module.exports = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);

  return function(content, context, options) {
    var opts = _.extend(phaserOpts, options);
    var layoutPath = path.join(opts.layouts, opts.layout);

    var layout = defaultLayout;
    if(file.exists(layoutPath)) {
      layout = file.readFileSync(layoutPath);
    }

    var ctx = _.defaults({}, {content: content}, context);
    return phaser.template(layout, ctx);
  };
};