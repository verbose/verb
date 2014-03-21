var path = require('path');
var file = require('fs-utils');
var relative = require('relative');
var verb = require('../');

var opts = {
  cwd: 'docs',
  prefixBase: true,
  destBase: 'test/actual/',
  ext: '.md',
};

file.expand(['*.md'], opts).map(function(filepath) {
  verb.init(opts);
  verb.options = verb.options || {};

  var name = file.base(filepath) + opts.ext;
  var dest = verb.cwd(opts.destBase, name);

  verb.options.src = filepath;
  verb.options.dest = dest;

  file.writeFileSync(dest, verb.read(filepath, opts));
  verb.log.success('Saved to', relative(verb.cwd(), dest));
});