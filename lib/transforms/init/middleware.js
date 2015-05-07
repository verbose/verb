'use strict';

var middleware = require('../../middleware/');
var mu = require('middleware-utils');

/**
 * Initialize default middleware
 */

module.exports = function(app) {
  var delims = mu.delims();

  app.onLoad(/./, mu.parallel([
    middleware.props,
    middleware.cwd(app),
    middleware.engine,
    middleware.src,
    middleware.ext,
    middleware.dest,
    middleware.debug(app),
  ]), mu.error('onLoad (js)'));

  app.onLoad(/\.js$/, mu.parallel([
    middleware.copyright(app),
    middleware.todos(app),
  ]), mu.error('onLoad (js)'));

  app.onLoad(/\.md$/, mu.series([
    middleware.conflict(app),
    middleware.copyright(app),
    middleware.lint(app),
    require('template-toc')(app),
    delims.escape(),
  ]), mu.error('onLoad (md)'));

  app.preRender(/\.md$/, mu.parallel([
    middleware.lint(app),
    middleware.readme,
  ]), mu.error('preRender (md)'));

  app.postRender(/\.md$/, mu.parallel([
    delims.unescape(),
    middleware['lint-after'](app),
    middleware.diff(app),
  ]), mu.error('postRender'));
};
