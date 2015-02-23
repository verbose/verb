'use strict';

/**
 * Add `year` to `this.cache.data.year`
 *
 * @param  {Object} `verb`
 * @return {[type]}
 */

module.exports = function year(verb) {
  if (!verb.hasData('year')) {
    verb.data({year: new Date().getFullYear()});
  }
};
