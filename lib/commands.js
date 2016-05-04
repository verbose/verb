'use strict';

var commands = require('./commands/');

module.exports = function(app, options) {
  app.debug('adding custom verb commands');
  for (var key in commands) {
    if (commands.hasOwnProperty(key)) {
      app.debug('adding command > %s', key);
      app.cli.map(key, commands[key](app, options));
    }
  }
};
