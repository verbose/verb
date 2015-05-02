'use strict';

var middleware = require('../../middleware/');
var mu = require('middleware-utils');

/**
 * Initialize default middleware
 */

module.exports = function middleware_(verb) {
  var delims = mu.delims();

  verb.onLoad(/\.js$/, mu.parallel([
    middleware.copyright(verb),
    middleware.todos(verb),
  ]), mu.error('onLoad (js)'));

  verb.onLoad(/\.md$/, mu.series([
    middleware.conflict(verb),
    middleware.copyright(verb),
    middleware.props,
    middleware.cwd(verb),
    middleware.engine,
    middleware.src,
    middleware.dest,
    middleware.ext,
    middleware.lint(verb),
    require('template-toc')(verb),
    delims.escape(),
  ]), mu.error('onLoad (md)'));

  verb.preRender(/\.md$/, mu.parallel([
    middleware.lint(verb),
    middleware.readme,
  ]), mu.error('preRender (md)'));

  verb.postRender(/\.md$/, mu.parallel([
    delims.unescape(),
    middleware['lint-after'](verb),
    middleware.diff(verb),
  ]), mu.error('postRender'));
};
