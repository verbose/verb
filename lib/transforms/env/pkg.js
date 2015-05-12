'use strict';

var utils = require('../../utils');
var cache = {};

/**
 * Called in the `init` transform. A read-only copy of this data is also
 * stored on `verb.env`
 *
 * @param  {Object} `verb`
 */

module.exports = function(verb) {
  var filename = verb.option('config') || 'package.json';

  verb.data(filename, function (fp) {
    return cache[fp] || (cache[fp] = utils.tryRequire(fp) || {});
  });
};
