const file = require('fs-utils');
const plasma = require('plasma');
const _ = require('lodash');


var normalizeDotfiles = function (verb, obj) {
  var result = [];
  Object.keys(obj).forEach(function(key) {
    result.push({
      dest: verb.cwd('.' + key),
      lines: obj[key]
    });
  });
  return result;
};

/**
 * Generate dotfiles from a data file
 *
 * @api Public
 */

module.exports = function(verb) {
  var options = _.extend({}, verb.options || {});
  verb.context = verb.context || {};

  var dotfileData = options.dotfiles || verb.context.dotfiles || verb.cwd('docs/dotfiles.{json,yml}');

  // Load dotfile data, while processing any lodash templates
  var dotfiles = plasma.process(dotfileData, verb.context);

  if (dotfiles.files) {
    normalizeDotfiles(verb, dotfiles.files).forEach(function(dotfile) {
      // Write the dotfiles to the specified destination
      file.writeFileSync(dotfile.dest, dotfile.lines.join('\n'));
    });
  }

  // Add dotfiles data to the context
  verb.context.dotfiles = dotfiles || {};
};