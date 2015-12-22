'use strict';

var commands = require('./commands');
var utils = require('../utils');

/**
 * Verb CLI
 *
 *  Custom extensions to the built-in mappings
 *  provided by the `base-cli` plugin.
 */

module.exports = function(verb) {

  /**
   * Help and information-related
   */

  verb.cli
    .map('init', function(fp) {
      console.log('cli > init (implement me!)');
      verb.set('questions.options.forceAll', true);
    })
    .map('help', commands.help(verb))
    .map('show', commands.show(verb))
    .map('open', commands.open(verb))
    .map('diff', function(val) {
      verb.option('diff', val);
    })

  /**
   * Options, settings and context related
   */

  verb.cli
    .map('ask', commands.ask(verb))
    .map('cwd', function(val) {
      verb.option('cwd', val);
    })
    .map('save', function(val) {
      verb.store.config.set(val);
      val = utils.tableize(val);
      console.log('saved > "%j" %s', val, 'in global config store.');
    })
    .map('data', function(val) {
      verb.data(val);
    })
    .map('option', function(val) {
      verb.option(val);
    })
    .map('config', function(val) {
      verb.config.process({
        update: val
      });
    });

  /**
   * Task-related
   */

  verb.cli
    .map('choose', function(key) {
      if (key === true) {
        verb.enable('tasks.choose');
      }
    })
    .map('tasks', function(key) {
      if (key === true) {
        verb.enable('tasks.display');
      }
    });

};
