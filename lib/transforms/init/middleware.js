'use strict';

var mu = require('middleware-utils');
var middleware = require('../../middleware/');
var utils = require('../../utils/');

/**
 * Initialize default middleware
 */

module.exports = function middleware_(verb) {
  verb.onLoad(/\.js$/, utils.parallel([
    middleware.copyright(verb),
    middleware.todos(verb),
  ]), mu.error('onLoad (js)'));

  verb.onLoad(/\.md$/, utils.series([
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
    utils.escape,
  ]), mu.error('onLoad (md)'));

  verb.preRender(/\.md$/, utils.parallel([
    middleware.lint(verb),
    middleware.readme,
  ]), mu.error('preRender (md)'));

  verb.postRender(/\.md$/, utils.parallel([
    utils.unescape,
    middleware['lint-after'](verb),
    middleware.diff(verb),
  ]), mu.error('postRender'));
};
