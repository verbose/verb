'use strict';

var utils = require('../utils/');

/**
 * Initialize default middleware
 */

module.exports = function middleware_(verb) {
  verb.onLoad(/\.js$/, utils.parallel([
    require('../middleware/copyright')(verb)
  ]), error('.onLoad (js):'));

  verb.onLoad(/\.md$/, utils.series([
    require('../middleware/props'),
    require('../middleware/cwd')(verb),
    require('../middleware/engine'),
    require('../middleware/data'),
    require('../middleware/src'),
    require('../middleware/dest'),
    require('../middleware/ext')(verb),

    require('template-toc')(verb),
    require('../middleware/multi-toc'),
    require('../middleware/readme'),
  ]), error('.onLoad (md):'));

  verb.preRender(/\.md$/, utils.parallel([
    utils.escape
  ]), error('.preRender:'));

  verb.postRender(/\.md$/, utils.parallel([
    utils.unescape
  ]), error('.postRender:'));
};


function error(verb) {
  return function (err, file, next) {
    if (err) console.log(verb, err);
  }
}
