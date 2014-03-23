/**
 * Default layout to use when one isn't
 * defined in the options.
 *
 * @return {String}
 * @api Public
 */

module.exports = [
  '<!doctype html>',
  '<html lang="en">',
  '  <head>',
  '    {%= include("header", {ext: ".html"}) %}',
  '  </head>',
  '  <body>',
  '    <div class="container bs-docs-container">',
  '      {%= content %}',
  '    </div>',
  '  </body>',
  '</html>'
].join('\n');
