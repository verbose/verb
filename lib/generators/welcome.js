'use strict';

var debug = require('debug')('verb:generator');
var isYes = require('is-affirmative');

module.exports = function(app) {
  app.questions
    .set('tasks', {
      message: 'Would you like to choose generators or tasks to run automatically when you run verb?',
      force: true
    })
    .set('run.before', {
      message: 'Enter the names of the generators and tasks to run:',
      type: 'input',
      force: true
    })
    .set('run.after', {
      message: 'Enter the names of the generators and tasks to run after `end` is emitted:',
      type: 'input',
      force: true
    });

  app.task('default', function(cb) {
    app.ask('tasks', function(err, answers) {
      if (isYes(answers.tasks)) {
        app.ask('run', function(err, answers) {
          answers.run.before = answers.run.before.split(' ');
          answers.run.after = answers.run.after.split(' ');
          var res = answers.run;
          console.log('implement me!');
          console.log(res)
          cb();
        });
      } else {
        console.log('aborted');
        cb();
      }
    });
  });
};
