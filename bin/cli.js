#!/usr/bin/env node

'use strict';

var path = require('path');
var gutil = require('gulp-util');
var prettyTime = require('pretty-hrtime');
var chalk = require('chalk');
var semver = require('semver');
var archy = require('archy');
var Liftoff = require('liftoff');
var tildify = require('tildify');
var interpret = require('interpret');
var v8flags = require('v8flags');
var completion = require('../lib/completion');
var argv = require('minimist')(process.argv.slice(2));
var taskTree = require('../lib/taskTree');
var padKeys = require('../lib/utils/pad-keys');

// set env var for ORIGINAL cwd
// before anything touches it
process.env.INIT_CWD = process.cwd();

var cli = new Liftoff({
  name: 'verb',
  completions: completion,
  extensions: interpret.jsVariants,
  nodeFlags: v8flags.fetch()
});

// exit with 0 or 1
var failed = false;
process.once('exit', function(code) {
  if (code === 0 && failed) {
    process.exit(1);
  }
});

var cliPackage = require('../package');
var versionFlag = argv.v || argv.version;
var tasksFlag = argv.T || argv.tasks;
var tasks = argv._;
var toRun = tasks.length ? tasks : ['default'];

var simpleTasksFlag = argv['tasks-simple'];
var shouldLog = !argv.silent && !simpleTasksFlag;

if (!shouldLog) {
  gutil.log = function(){};
}

cli.on('require', function (name) {
  gutil.log('Requiring external module', chalk.magenta(name));
});

cli.on('requireFail', function (name) {
  gutil.log(chalk.red('Failed to load external module'), chalk.magenta(name));
});

cli.on('respawn', function (flags, child) {
  var nodeFlags = chalk.magenta(flags.join(', '));
  var pid = chalk.magenta(child.pid);
  gutil.log('Node flags detected:', nodeFlags);
  gutil.log('Respawned to PID:', pid);
});

cli.launch({
  cwd: argv.cwd,
  configPath: argv.verbfile,
  require: argv.require,
  completion: argv.completion
}, handleArguments);


// the actual logic
function handleArguments(env) {
  console.log();

  if (versionFlag && tasks.length === 0) {
    gutil.log('CLI version', cliPackage.version);
    if (env.modulePackage && typeof env.modulePackage.version !== 'undefined') {
      gutil.log('Local version', env.modulePackage.version);
    }
    process.exit(0);
  }

  env.modulePath = path.resolve(__dirname, '../index.js');
  if (!env.modulePath) {
    gutil.log(
      chalk.red('Local verb not found in'),
      chalk.magenta(tildify(env.cwd))
    );
    gutil.log(chalk.red('Try running: npm install verb'));
    process.exit(1);
  }

  if (!env.configPath) {
    env.configPath = path.resolve(__dirname, '../lib/_verbfile.js');
  }

  // check for semver difference between cli and local installation
  if (semver.gt(cliPackage.version, env.modulePackage.version)) {
    gutil.log(chalk.red('Warning: verb version mismatch:'));
    gutil.log(chalk.red('Global verb is', cliPackage.version));
    gutil.log(chalk.red('Local verb is', env.modulePackage.version));
  }

  // chdir before requiring verbfile to make sure
  // we let them chdir as needed
  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
  }

  // this is what actually loads up the verbfile
  require(env.configPath);
  gutil.log('[verbfile]', chalk.gray(tildify(env.configPath)));

  var verbInst = require(env.modulePath);
  logEvents(verbInst);

  process.nextTick(function () {
    if (simpleTasksFlag) {
      return logTasksSimple(env, verbInst);
    }
    if (tasksFlag) {
      return logTasks(env, verbInst);
    }
    verbInst.start.apply(verbInst, toRun);
  });
}

function logTasks(env, localVerb) {
  var tree = taskTree(localVerb.tasks);
  tree.label = 'Tasks for ' + chalk.gray(tildify(env.configPath));
  archy(tree).split('\n')
    .forEach(function (v) {
      if (v.trim().length === 0) {
        return;
      }
      gutil.log(v);
    });
}

function logTasksSimple(env, localVerb) {
  var keys = Object.keys(localVerb.tasks)
  console.log(keys.join('\n').trim());
}

// format orchestrator errors
function formatError(e) {
  if (!e.err) {
    return e.message;
  }

  // PluginError
  if (typeof e.err.showStack === 'boolean') {
    return e.err.toString();
  }

  // normal error
  if (e.err.stack) {
    return e.err.stack;
  }

  // unknown (string, number, etc.)
  return new Error(String(e.err)).stack;
}

// wire up logging events
function logEvents(verbInst) {
  var o = padKeys(verbInst.tasks);
  verbInst.on('err', function () {
    failed = true;
  });

  verbInst.on('task_start', function (e) {
    gutil.log('[starting] ·', chalk.cyan(o[e.task]));
  });

  verbInst.on('task_stop', function (e) {
    var time = prettyTime(e.hrDuration);
    gutil.log('[finished] ·', chalk.cyan(o[e.task]), '· after', chalk.magenta(time) );
  });

  verbInst.on('task_err', function (e) {
    var msg = formatError(e);
    var time = prettyTime(e.hrDuration);
    gutil.log(chalk.cyan(o[e.task]), chalk.red('errored after'), chalk.magenta(time));
    gutil.log(msg);
  });

  verbInst.on('task_not_found', function (err) {
    gutil.log(chalk.red('task \'' + err.task + '\' is not in your verbfile'));
    gutil.log('please check the documentation for proper verbfile formatting');
    process.exit(1);
  });
}
