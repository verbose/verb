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
      middleware.engine,
      middleware.src,
      middleware.ext,
      middleware.dest,
      middleware.layout,
      middleware.debug(app),
    ]), mu.error('onLoad (js)'))

    .onLoad(/\.js$/, mu.parallel([
      middleware.copyright(app),
    ]), mu.error('onLoad (js)'))

    .onLoad(/\.md$/, mu.series([
      middleware.copyright(app),
      require('template-toc')(app),
      middleware.examples(app),
      delims.escape(),
    ]), mu.error('onLoad (md)'))

    .preRender(/\.md$/, mu.parallel([
      middleware.readme(app),
    ]), mu.error('preRender (md)'))

    .postRender(/\.md$/, mu.parallel([
      delims.unescape(),
      middleware['lint-after'](app),
      middleware.diff(app),
    ]), mu.error('postRender'))
};
