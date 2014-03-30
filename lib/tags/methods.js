/**
 * Verb <https://github.com/assemble/verb>
 * Generate markdown documentation for GitHub projects.
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

const path = require('path');
const methods = require('list-methods');
const _ = require('lodash');


module.exports = function(verb) {
  verb.options = verb.options || {};


  exports.methods = function(src, options) {
    options = options || {};
    options.template = options.template || 'md';
    options = _.extend({}, verb.options.methods || {}, options);

    var tmpl = verb.scaffolds['methods'][options.template];
    var list = methods(path.resolve(src));

    var context = _.cloneDeep(verb.context);
    var data = _.extend(context, options, {list: list});
    return verb.template(tmpl, data);
  };

  return exports;
};