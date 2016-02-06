'use strict';

var utils = require('../utils');

module.exports = function(verb) {

  verb.task('verbmd', function(cb) {
    var opts = { cwd: verb.cwd, filename: '.verb.md' };
    utils.conflict(verb, opts, function(err, conflict) {
      if (err) {
        cb(err);
        return;
      }

      if (conflict === true) {
        console.log('keeping existing .verb.md');
        cb();
        return;
      }

      verb.src('templates/.verb.md', {cwd: __dirname})
        .pipe(verb.dest(verb.cwd))
        .on('end', function() {
          console.log('created .verb.md');
          cb();
        });
    });
  });

  verb.task('default', ['verbmd']);
};
