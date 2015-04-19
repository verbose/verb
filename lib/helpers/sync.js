'use strict';

var fs = require('fs');
var path = require('path');
var relative = require('relative');
var resolve = require('helper-resolve');

/**
 * Transform for loading default sync helpers
 */

module.exports = function sync_(verb) {
  verb.helper('apidocs', require('template-helper-apidocs'));
  verb.helper('codelinks', require('helper-codelinks')(verb));
  verb.helper('changelog', require('helper-changelog'));
  verb.helper('copyright', require('helper-copyright'));
  verb.helper('coverage', require('helper-coverage'));
  verb.helper('license', require('helper-license'));
  verb.helper('date', require('helper-date'));

  verb.helper('resolve', function (name, key) {
    return resolve.sync(fp)[typeof key === 'string' ? key : 'main'];
  });

  verb.helper('example', function (fp, name) {
    var str = fs.readFileSync(fp, 'utf8').trim();
    return str.split('(\'./\')').join('(\'' + name + '\')');
  });
};
