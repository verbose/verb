'use strict';

var isYes = require('is-affirmative');

module.exports = function(verb) {
  verb.task('default', function(cb) {
    verb.questions
      .set('verbmd', 'Can\'t find a .verb.md, want to add one?', {
        save: false
      });

    verb.ask('verbmd', function(err, answers) {
      if (err) {
        cb(err);
        return;
      }

      if (!isYes(answers.verbmd)) {
        cb();
        return;
      }

      verb.src('templates/.verb.md', {cwd: __dirname})
        .pipe(verb.dest(verb.cwd))
        .on('end', function() {
          console.log('created verbfile.js');
          cb();
        });

    });
  });
};
