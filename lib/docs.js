'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var loaded;
var views = {};

module.exports = function(options) {
  return function(app) {
    create(app, 'docs', 'renderable');
    create(app, 'includes', 'partial');
    create(app, 'layouts', 'layout');

    var userDocs = path.join.bind(path, process.cwd());

    if (fs.existsSync(userDocs())) {
      app.docs.loadViews('.verb.md', {cwd: userDocs()});

      app.includes.loadViews('*.md', {cwd: userDocs('docs/includes')});
      app.layouts.loadViews('*.md', {cwd: userDocs('docs/layouts')});
      app.docs.loadViews('*.md', {cwd: userDocs('docs')});
    }

    var collections = loadDefaults(app);
    if (collections) {
      for (var key in collections) {
        var collection = collections[key];
        for (var name in collection) {
          if (!app.views[key][name]) {
            app.views[key][name] = collection[name];
          }
        }
      }
    }
  };
};

function loadDefaults(app) {
  if (loaded) return views;
  loaded = true;

  var docs = path.join.bind(path, __dirname, '../docs/src/readme');
  app.includes.loadViews('*.md', {cwd: docs('includes')});
  app.layouts.loadViews('*.md', {cwd: docs('layouts')});
  app.docs.loadViews('*.md', {cwd: docs()});

  // cache views
  views.includes = app.views.includes;
  views.layouts = app.views.layouts;
  views.docs = app.views.docs;
  return views;
}

function create(app, name, type) {
  if (app[name]) return;
  return app.create(name, {
    viewType: [type],
    renameKey: function(key) {
      return path.basename(key, path.extname(key));
    }
  });
}
