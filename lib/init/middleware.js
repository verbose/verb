'use strict';

var utils = require('../utils/');

/**
 * Initialize default middleware
 */

module.exports = function middleware_(verb) {
  verb.onLoad(/\.js$/, utils.parallel([
    require('../middleware/copyright')(verb)
  ]));

  verb.onLoad(/\.md$/, utils.parallel([
    require('template-toc')(verb),
    require('../middleware/multi-toc'),
    require('../middleware/readme'),
    require('../middleware/data'),
    require('../middleware/ext'),
  ]));

  verb.preRender(/\.md$/, utils.parallel([
    utils.escape
  ]));

  verb.postRender(/\.md$/, utils.parallel([
    utils.unescape
  ]));
};
