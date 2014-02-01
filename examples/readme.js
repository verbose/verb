var path = require('path');
var file = require('fs-utils');
var phaser = require('../');

var opts = {
  functions: {
    docs: function (filepath) {
      var src = path.join('docs', filepath + '.md');
      return file.readFileSync(src);
    }
  }
};

phaser.expand('*.tmpl.md', 'test/actual/', opts);
