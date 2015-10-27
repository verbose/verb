'use strict';

/**
 * Plugin for creating default view collections
 *  | docs
 *  | layouts
 *  | includes
 *  | shields
 *  | badges
 */

var utils = require('./utils');

module.exports = function (app) {
  app.create('badges', {
    viewType: ['partial'],
    renameKey: utils.rename,
    engine: 'md'
  });

  app.create('shields', {
    viewType: ['partial'],
    renameKey: utils.rename,
    engine: 'md'
  });

  app.create('includes', {
    viewType: ['partial'],
    renameKey: utils.rename,
    cwd: utils.includes,
    engine: 'md',
  });

  app.create('docs', {
    viewType: ['partial'],
    renameKey: utils.basename,
    engine: 'md'
  });

  app.create('layouts', {
    viewType: ['layout'],
    renameKey: utils.basename,
    engine: 'md'
  });
};
