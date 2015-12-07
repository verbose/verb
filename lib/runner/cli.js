'use strict';

module.exports = function(verb) {
  if (!verb.cli) {
    verb.use(require('base-cli')());
  }

  verb.cli
    .map('save', function(key, val) {
      console.log(key, val);
    })
    .map('data', function(val) {
      verb.visit('data', val);
    })
    .map('cwd', function(fp) {
      verb.option('cwd', fp);
    });

  verb.define('commands', verb.cli.keys);
};

