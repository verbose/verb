'use strict';

var utils = require('../../utils/');

/**
 * Initialize default middleware
 */

module.exports = function middleware_(verb) {
  verb.onLoad(/\.js$/, utils.parallel([
    require('../../middleware/copyright')(verb),
    require('../../middleware/todos')(verb)
  ]), error('.onLoad (js):'));

  verb.onLoad(/\.md$/, utils.series([
    require('../../middleware/props'),
    require('../../middleware/cwd')(verb),
    require('../../middleware/engine'),
    require('../../middleware/src'),
    require('../../middleware/dest'),
    require('../../middleware/ext'),
    require('../../middleware/todos')(verb),
    // require('../../middleware/lint')(verb),
    require('template-toc')(verb),
    utils.escape,
  ]), error('.onLoad (md):'));

  verb.preRender(/\.md$/, utils.parallel([
    require('../../middleware/multi-toc'),
    require('../../middleware/readme'),
  ]), error('.preRender (md):'));

  verb.postRender(/\.md$/, utils.parallel([
    utils.unescape,
    require('../../middleware/lint-after')(verb),
    require('../../middleware/diff')(verb)
  ]), error('.postRender:'));
};

function error(method) {
  return function (err, file, next) {
    if (err) console.log(method, err);
    next();
  };
}
