'use strict';

var fs = require('fs');

module.exports = function(verb) {
  verb.doc('readme.md', {content: fs.readFileSync('.verb.md')});

  verb.task('default', function(cb) {
    console.log('verbfile > default task');
    cb();
  });
};
