'use strict';

var utils = require('../utils');

module.exports = function(verb, base, env) {
  if (!verb.cli) {
    throw new Error('the base-cli plugin should be registered on every instance');
  }

  verb.cli
    .map('ask', function(key) {
      if (key === true) {
        verb.enable('questions.init');
      } else {
        verb.questions.enqueue(key);
        verb.option('questions.init', key);
      }
    })
    .map('choose', function(key) {
      if (key === true) {
        verb.enable('choose tasks');
      }
    })
    .map('cwd', function(fp) {
      verb.option('cwd', fp);
    })
    .map('data', function(val) {
      verb.visit('data', val);
    })
    .map('md', function(key, val) {
      console.log('cli:md', verb.views)
      verb.enable('ask.verbmd');
    })
    .map('save', function(obj) {
      verb.config.process({pkg: obj});
    })
    .map('tasks', function(key) {
      if (key === true) {
        verb.enable('display tasks');
      }
    })

  verb.define('commands', verb.cli.keys);
};

