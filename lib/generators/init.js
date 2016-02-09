'use strict';

var debug = require('debug')('verb:generator');
var isYes = require('is-affirmative');

module.exports = function(app, base) {
  var store = app.store;

  app.questions
    .set('setTasks', {
      message: 'Default tasks',
      type: 'input',
      force: true
    })
    .set('run', {
      message: 'Do you want to run tasks when arbitrary flags are passed?',
      type: 'input',
      force: true
    })
    .set('run.before', {
      message: 'Enter the names of the generators and tasks to run:',
      type: 'input',
      force: true
    })
    .set('run.after', {
      message: 'Enter the names of one or more tasks, generators, or generators and tasks to run after `end` is emitted:',
      type: 'input',
      force: true
    });

  app.task('default', function(cb) {
    console.log('Welcome to verb! Since this is your first time running verb,');
    console.log('you can specify the names of tasks and/or generators to run');
    console.log('every time you run verb. Tips:');
    console.log('- to run the `readme` generator, just enter "readme"')
    console.log('- to run the `default` generator, just enter "default"')
    console.log('- search npm for verb generators, and enter the names of the generators to run');
    app.ask('setTasks', function(err, answers) {
      if (err) return cb(err);
      var tasks = answers.setTasks;
      store.set('tasks', tasks);
      console.log('Tasks "%s" will now run with the verb command', tasks);
      cb();
    });
  });

  app.task('run', function(cb) {
    app.ask('run', function(err, answers) {
      answers.run.before = answers.run.before.split(' ');
      answers.run.after = answers.run.after.split(' ');
      var res = answers.run;
      console.log('implement me!');
      console.log(res);
      cb();
    });
  });
};
