'use strict';

var exists = require('fs-exists-sync');
var fs = require('fs');

/**
 * Run the given generators and tasks. This flag is unnecessary when
 * used with [base-runner][].
 *
 * ```sh
 * # run task 'foo'
 * $ app --tasks foo
 * # => {task: ['foo']}
 * # run generator 'foo', task 'bar'
 * $ app --tasks foo:bar
 * # => {task: ['foo:bar']}
 * ```
 * @name tasks
 * @api public
 * @cli public
 */

module.exports = function(app, options) {
  var ran = false;

  return function(val, key, config, next) {
    if (config.run === false) {
      next();
      return;
    }

    if (ran) {
      next();
      return;
    }

    ran = true;

    var argv = app.get('cache.argv');
    var configFile = options.env.configFile;
    var tasks = setTasks(app, configFile, val, argv);
    app.generateEach(tasks, next);
  };
};

/**
 * Determine the task to run
 */

function setTasks(app, configFile, tasks, argv) {
  if (argv.processed.hasOwnProperty('new')) {
    return ['verb.new:' + argv.processed.new];
  }

  tasks = tasks.map(function(task) {
    if (task.indexOf('new:') === 0) {
      return 'verb.' + task;
    }
    return task;
  });

  var configTasks = app.pkg.get('verb.tasks');

  if (tasks.length === 1 && tasks[0] === 'default') {
    // if a `verbfile.js` or custom configFile exists, return tasks
    if (exists(configFile)) {
      if (configTasks && configTasks.length) {
        app.pkg.logWarning('ignoring tasks defined in package.json:', {tasks: configTasks});
      }
      return tasks;
    }

    if (configTasks && configTasks.length) {
      return configTasks;
    }

    var verbmd = exists('.verb.md');

    // if a `.verb.md` exists, but no verbfile.js, set `readme` as the default
    if (verbmd && !exists(configFile)) {
      return ['readme'];
    }

    // if no verbfile.js, and no `.verb.md`, ask the user if they want a `.verb.md`
    if (!verbmd) {
      return ['new:verbmd'];
    }
  }
  return tasks;
}
