var util = require('util');
var strftime = require('strftime');
var chalk = require('chalk');
var pad = require('pad');
var phaser = require('../');


exports.init = function(config, options, params) {
  var phaser = params.phaser;

  /**
   * General log
   *
   * @public
   * @return {string}
   */

  var log = phaser.log = function () {
    arguments = [].map.call(arguments, function (arg) {
      return chalk.stripColor(arg);
    });
    arguments[0] = phaser.utils.time() + chalk.gray(arguments[0]);
    return console.log.apply(this, arguments);
  };

  log.verbose = {};

  /**
   * Bold
   *
   * @public
   * @return {string}
   */

  log.bold = function () {
    arguments[0] = chalk.bold(arguments[0]);
    return console.log.apply(this, arguments);
  };

  /**
   * Error
   *
   * @public
   * @return {string}
   */

  log.error = function () {
    arguments[0] = chalk.red(arguments[0]);
    return console.error.apply(this, arguments);
  };

  /**
   * Warn
   *
   * @public
   * @return {string}
   */

  log.warn = function () {
    arguments[0] = chalk.yellow(arguments[0]);
    return console.warn.apply(this, arguments);
  };

  /**
   * Info
   *
   * @public
   * @return {string}
   */

  log.info = function () {
    arguments[0] = arguments[0];
    return console.log.apply(this, arguments);
  };

  /**
   * Info
   *
   * @public
   * @return {string}
   */

  log.success = function () {
    arguments[0] = chalk.green(arguments[0]);
    return console.info.apply(this, arguments);
  };


  // markdown CLI formats

  // Emphasis
  log.em = chalk.green;

  // Links
  log.path = chalk.blue.underline;

  // Code
  log.code = chalk.cyan;

  // Add all properties on `log` to `verbose`
  Object.keys(log).filter(function(key) {
    return typeof log[key] === 'function';
  }).forEach(function(key) {
    log.verbose[key] = function() {
      if(options.verbose !== false) {
        log[key].apply(log, arguments);
        return log.verbose;
      } else {
        return;
      }
    };
  });
  return log;
};

