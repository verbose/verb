var file = require('fs-utils');
var _ = require('lodash');
// var configfiles = require('configfiles');


// module.exports = function (config, options, params) {
//   var phaser = params.phaser;
//   var files = config.files ? configfiles(config.files) : {};
//   return files;
// };

module.exports = function (config, options, params) {
  var phaser = params.phaser;
  var src = phaser.orig;

  // Alias for phaser(src).content;
  exports.process = function(src, options) {
    return phaser(src, _.extend({}, options)).content;
  };

  // Read a file, then process with Phaser
  exports.read = function(src, options) {
    var content = file.readFileSync(src);
    return phaser.file.process(content, _.extend({}, options));
  };

  // Read a file, process it with Phaser, then write it.
  exports.copy = function(src, dest, options) {
    var opts = _.extend({}, options);
    file.writeFileSync(dest, phaser.file.read(src, opts));
    phaser.log.success('>> Saved to:', dest);
  };

  exports.expand = function(src, dest, options) {
    var opts = _.extend({}, options);
    file.expandMapping(src, dest, opts.glob || {}).map(function(fp) {
      file.writeFileSync(fp.dest, phaser.file.read(fp.src, opts));
      phaser.log.success('>> Saved to:', fp.dest);
    });
    // Log a success message if everything completed.
    phaser.log.success('\n>> Completed successfully.');
  };

  return exports;
};