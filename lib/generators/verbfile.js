'use strict';

var utils = require('../utils');

module.exports = function(verb) {
  verb.task('verbfile', function(cb) {
    var opts = { cwd: verb.cwd, filename: 'verbfile.js' };
    utils.conflict(verb, opts, function(err, conflict) {
      if (err) {
        cb(err);
        return;
      }

      if (conflict === true) {
        console.log('keeping existing verbfile.js');
        cb();
        return;
      }

      verb.src('templates/verbfile.js', {cwd: __dirname})
        .pipe(verb.dest(verb.cwd))
        .on('end', function() {
          console.log('created verbfile.js');
          cb();
        });
    });
  });

  verb.task('default', ['verbfile']);
};
