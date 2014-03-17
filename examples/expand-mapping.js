/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
var file = require('fs-utils');
var verb = require('../');

var opts = {verbrc: 'examples/.verbrc'};
var globOpts = {
  cwd: 'docs',
  ext: '.md',
  destBase: 'test/actual/'
};

file.expandMapping(['docs/*.md'], globOpts).map(function(fp) {
  file.writeFileSync(fp.dest, verb.read(fp.src, opts));
  verb.log.success('Saved to', fp.dest);
});