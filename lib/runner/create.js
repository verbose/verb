'use strict';

var path = require('path');

/**
 * Create default template collections
 */

module.exports = function(options) {
  return function(app) {
    create(app, 'docs');
    create(app, 'jsFiles');
    create(app, 'badges', 'partial');
    create(app, 'includes', 'partial');
    create(app, 'layouts', 'layout');
    create(app, 'verb_sections', 'partial');
  };
};

/**
 * Create a view collection if it doesn't already exist.
 *
 * @param {String} `app` Verb instance ("app", since it's also compatible with assemble and other `base` apps)
 * @param {String} `name`
 * @param {String} `type`
 * @return {String}
 */

function create(app, name, type) {
  if (app[name]) return;
  type = type || 'renderable';

  return app.create(name, {
    engine: 'text',
    viewType: type,
    renameKey: function(key) {
      return path.basename(key, path.extname(key));
    }
  });
}
