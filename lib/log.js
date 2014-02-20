var colors = require('./colors');


exports.init = function(options, phaser) {

  /**
   * General log
   *
   * @public
   * @return {string}
   */

  var log = function () {
    var args = Array.prototype.map.call(arguments, function (arg) {
      return colors.stripColor(arg);
    });
    args[0] = phaser.utils.time() + colors.gray(args[0]);
    return console.log.apply(this, args);
  };

  log.verbose = {};

  /**
   * Bold
   *
   * @public
   * @return {string}
   */

  log.bold = function () {
    var args = arguments;
    args[0] = colors.bold(args[0]);
    return console.log.apply(this, args);
  };

  /**
   * Info
   *
   * @public
   * @return {string}
   */

  log.info = function () {
    var args = arguments;
    args[0] = args[0];
    return console.log.apply(this, args);
  };

  /**
   * Info
   *
   * @public
   * @return {string}
   */

  log.success = function () {
    var args = arguments;
    args[0] = colors.green('>> ' + args[0]);
    return console.log.apply(this, args);
  };

  /**
   * Warn
   *
   * @public
   * @return {string}
   */

  log.warn = function () {
    var args = arguments;
    args[0] = colors.yellow(args[0]);
    return console.warn.apply(this, args);
  };

  /**
   * Error
   *
   * @public
   * @return {string}
   */

  log.error = function () {
    var args = arguments;
    args[0] = colors.red(args[0]);
    return console.error.apply(this, args);
  };

  /**
   * Fatal
   *
   * @public
   * @return {string}
   */

  log.fatal = function () {
    var args = arguments;
    args[0] = colors.red.bold('  ' + args[0]);
    console.error();
    console.error.apply(this, args);
    console.error('There is a way out of every box, a solution to every puzzle; it\'s just a matter of finding it. --Picard');
    process.exit(1);
  };

  /**
   * markdown CLI formats
   */

  // Emphasis
  log.em = colors.green;

  // Links
  log.path = colors.blue.underline;

  // Code
  log.code = colors.cyan;

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

