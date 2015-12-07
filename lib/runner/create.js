'use strict';

var path = require('path');

/**
 * Create default template collections
 */

module.exports = function(options) {
  return function(app) {
    create(app, 'docs', 'renderable');
    create(app, 'badges', 'partial');
    create(app, 'includes', 'partial');
    create(app, 'layouts', 'layout');
  };
};

function create(app, name, type) {
  // only create the collection if it doesn't already exist
  if (app[name]) return;

  app.create(name, {
    viewType: [type],
    renameKey: function(key) {
      return path.basename(key, path.extname(key));
    }
  });
}
