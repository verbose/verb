'use strict';

var fs = require('fs');
var path = require('path');
var parse = require('parse-gitignore');
var union = require('lodash')._.union;
var utils = require('../../utils');

/**
 * Read `.gitignore` and add patterns to
 * `options.ignore`
 */

module.exports = function(verb) {
  if (typeof verb.cache.data.ignore === 'undefined') {
    var ignore = union(verb.option('ignore'), verb.env.ignore);
    verb.data({ignore: gitignore(verb.cwd, '.gitignore', ignore)});
  }
};

/**
 * Parse the local `.gitignore` file and add
 * the resulting ignore patterns.
 */

function gitignore(cwd, fp, arr) {
  fp = path.resolve(cwd, fp);
  if (!fs.existsSync(fp)) {
    return utils.defaultIgnores;
  }
  var str = fs.readFileSync(fp, 'utf8');
  return parse(str, arr);
}
