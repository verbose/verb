'use strict';

var utils = require('../shared/utils');
var cache = require('../cache');


/**
 * Called in the `init` transform. Adds Verb's package.json
 * data to `verb.verb`. A read-only copy of this data is also
 * stored on `verb.env`
 *
 * @param  {Object} `verb`
 */

module.exports = function(verb) {
  verb.data(verb.option('config'), function(fp) {
    return cache[fp] || (cache[fp] = utils.tryRequire(fp));
  });
};