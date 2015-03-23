'use strict';

var utils = require('../utils/');

/**
 * Initialize default middleware
 */

module.exports = function middleware_(verb) {
  verb.onLoad(/\.js$/, utils.parallel([
    require('../middleware/copyright')(verb),
    require('../middleware/todos')(verb)
  ]), error('.onLoad (js):'));

  verb.onLoad(/\.md$/, utils.series([
    require('../middleware/props'),
    require('../middleware/cwd')(verb),
    require('../middleware/engine'),
    require('../middleware/data'),
    require('../middleware/src'),
    require('../middleware/dest'),
    require('../middleware/ext'),
    require('../middleware/todos')(verb),
    require('template-toc')(verb),
  ]), error('.onLoad (md):'));

  verb.preRender(/\.md$/, utils.parallel([
    require('../middleware/conflict')(verb),
    require('../middleware/multi-toc'),
    require('../middleware/readme'),
    utils.escape
  ]), error('.preRender (md):'));

  verb.postRender(/\.md$/, utils.parallel([
    utils.unescape
  ]), error('.postRender:'));

  // verb.initFlush(/\.md$/, function (file, next) {
  //   console.log(file);
  //   next();
  // }, error('.initFlush:'));
};

function error(method) {
  return function (err, file, next) {
    if (err) console.log(method, err);
    next();
  };
}
