'use strict';

var isObject = require('isobject');
var color = require('ansi-colors');

module.exports = function(app, options) {

  /**
   * Allow the user to choose the stores to use for saving a value (after prompts)
   */

  app.question('set', 'To save your answers, pick one or more of the following (press <enter> to skip):', {
    type: 'checkbox',
    save: false,
    choices: [{
      key: 'a',
      name: color.yellow(' app store') + ' (for ' + app._name + '-specific values)',
      value: 'app'
    }, {
      key: 'g',
      name: color.yellow(' global store') + ' (for values to be shared across all base applications (generate, assemble, verb, update, etc))',
      value: 'global'
    }, {
      key: 'p',
      name: color.yellow(' project config') + ' (for project-specific values, saved to the "' + app._name + '" object in package.json)',
      value: 'project'
    }],
    next: function(answer, question, answers, cb) {
      // try to erase some of the junk produced by inquirer
      process.stdout.write('\r\x1b[K');

      answers.stores = answers.stores || {};
      // rename store choices to actual properties on `app`
      answers.stores.set = answer.reduce(function(acc, name) {
        if (name === 'app') name = 'store';
        if (name === 'global') name = 'globals';
        if (name === 'project') name = 'pkg';

        if (!isObject(app[name]) || typeof app[name].set !== 'function') {
          return acc;
        }
        acc.push(name);
        return acc;
      }, []);

      delete answers.set;
      cb(null, answers);
    }
  });

  /**
   * Delete
   */

  app.question('del', 'Which stores would you like to delete the value from?:', {
    type: 'checkbox',
    save: false,
    choices: [{
      key: 'a',
      name: color.yellow(' app store') + ' (for ' + app._name + '-specific values)',
      value: 'app'
    }, {
      key: 'g',
      name: color.yellow(' global store') + ' (for values to be shared across all base applications (generate, assemble, verb, update, etc))',
      value: 'global'
    }, {
      key: 'p',
      name: color.yellow(' project config') + ' (for project-specific values, saved to the "' + app._name + '" object in package.json)',
      value: 'project'
    }],
    next: function(answer, question, answers, cb) {
      // try to erase some of the junk produced by inquirer
      process.stdout.write('\r\x1b[K');

      answers.stores = answers.stores || {};
      // rename store choices to actual properties on `app`
      answers.stores.del = answer.reduce(function(acc, name) {
        if (name === 'app') name = 'store';
        if (name === 'global') name = 'globals';
        if (name === 'project') name = 'pkg';

        if (!isObject(app[name]) || typeof app[name].del !== 'function') {
          return acc;
        }
        acc.push(name);
        return acc;
      }, []);

      delete answers.del;
      cb(null, answers);
    }
  });

  /**
   * Config questions
   */

  app.questions
    .set('config.layout', 'What layout would you like to use?', {
      default: 'default'
    })
    .set('config.toc', 'Add Table of Contents to README.md?', {
      type: 'confirm',
      default: false
    })
    .set('config.plugins', 'Plugins to use (comma-separated):', {
      default: ['gulp-format-md']
    })
    .set('config.tasks', 'Tasks or generators to run (comma-separated)', {
      default: ['readme']
    })
    .set('config.lint.reflinks', 'Do you want to lint for missing reflinks and add them to verb config?', {
      type: 'confirm'
    });

  /**
   * Ask the user if they want to install plugins, if any were specified
   */

  app.confirm('after.plugins', 'Plugins need to be installed, want to do that now?');

  /**
   * Init questions
   */

  app.question('init.preferences', 'Would you like to set defaults for this project?', {
    type: 'confirm',
    next: function(answer, question, answers, cb) {
      // ensure `init` questions aren't asked again
      delete answers.init;
      if (answer === true) {
        app.ask('init.choose', cb);
      } else {
        cb(null, answers);
      }
    }
  });

  app.choices('init.choose', 'Which options would you like to set?', {
    choices: buildChoices(app),
    save: false,
    next: function(answer, question, answers, cb) {
      // ensure `init` questions aren't asked again
      delete answers.init;
      if (typeof answer === 'undefined' || answer.length === 0) {
        cb(null, answers);
        return;
      }

      var choices = answer.map(function(val) {
        return 'config.' + val;
      });
      app.ask(choices, cb);
    }
  });
};

/**
 * Build the list of `config.*` options to prompt the user about
 */

function buildChoices(app) {
  return app.questions.queue.reduce(function(acc, key) {
    if (key.indexOf('config.') !== 0) {
      return acc;
    }
    key = key.slice('config.'.length);
    acc.push(key);
    return acc;
  }, []);
}
