'use strict';

var utils = require('../utils');

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
    var tasks = setTasks(app, options.env.configFile, val, argv);
    app.generateEach(tasks, next);
  };
};

/**
 * Determine the task to run
 */

function setTasks(app, configFile, tasks, argv) {
  if (argv.hasOwnProperty('new')) {
    return ['verb.new:' + argv.new];
  }

  if (argv.init === true) {
    return [];
  }

  tasks = tasks.map(function(task) {
    if (task.indexOf('new:') === 0) {
      return 'verb.' + task;
    }
    return task;
  });

  var configTasks = app.pkg.get('verb.tasks');

  if (tasks.length === 1 && tasks[0] === 'default') {
    var configExists = utils.exists(configFile);

    // if a `verbfile.js` or custom configFile exists, return tasks
    if (configExists) {
      if (configTasks && configTasks.length) {
        app.pkg.logWarning('ignoring tasks defined in package.json:', configTasks);
      }
      return tasks;
    }

    if (configTasks && configTasks.length) {
      return configTasks;
    }

    var verbmd = utils.exists('.verb.md');

    // if a `.verb.md` exists, but no verbfile.js, set `readme` as the default
    if (verbmd && !configExists) {
      return ['verb-readme-generator'];
    }

    // if no verbfile.js, and no `.verb.md`, ask the user if they want a `.verb.md`
    if (!verbmd) {
      return ['verb.new:prompt-verbmd'];
    }
  }
  return tasks;
}
