'use strict';

var path = require('path');
var utils = require('../utils');

module.exports = function(verb, base, env) {
  if (!verb.cli) {
    throw new Error('the base-cli plugin should be registered on every instance');
  }

  verb.store.on('set', function(key, val) {
    console.log('set >', key, val);
  });

  verb.cli
    .map('ask', function(key) {
      if (key === true) {
        verb.enable('questions.init');
      } else {
        verb.questions.enqueue(key);
        verb.option('questions.init', key);
      }
    })
    .map('open', function(name) {
      if (name === 'answers') {
        var dest = verb.get('questions.dest');
        if (dest) {
          console.log('opening answers data directory >', dest);
          utils.opn(dest);
          process.exit(0);
        }
      } else if (name === 'store') {
        var dir = path.dirname(verb.get('store.path'));
        if (dir) {
          console.log('opening store data directory >', dir);
          utils.opn(dir);
          process.exit(0);
        }
      }
    })
    .map('save', function(val) {
      verb.store.set(val);
    })
    .map('init', function(fp) {
      verb.enable('init');
      console.log(arguments);
    })
    .map('cwd', function(fp) {
      verb.option('cwd', fp);
    })
    .map('data', function(val) {
      verb.visit('data', val);
      console.log(verb.cache.data)
    })
    .map('md', function(key, val) {
      console.log('cli:md', verb.views)
      verb.enable('ask.verbmd');
    })
    // .map('config', function(obj) {
    //   verb.config.process({update: obj});
    // })

  // task related
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
    })

  verb.define('commands', verb.cli.keys);
};

