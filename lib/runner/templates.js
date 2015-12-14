'use strict';

var fs = require('fs');
var path = require('path');
var create = require('./create');
var loaded, views = {};

module.exports = function(options) {
  var includes = require('./includes');
  var badges = require('./badges');

  return function(verb) {
    verb.use(create(options));

    /**
     * DEPRECATED in the next release: Load includes and badges
     */

    verb.on('config-loaded', function() {
      for (var key in includes) {
        verb.include(key, {content: includes[key]});
      }

      for (var key in badges) {
        verb.badge(key, {content: badges[key]});
      }

      var userDir = path.join.bind(path, process.cwd());
      if (fs.existsSync(userDir())) {
        // api docs
        verb.libFiles.loadViews(['*.js', 'lib/*.js'], {cwd: userDir()});

        // templates
        verb.docs.loadViews('*', {cwd: userDir(), dot: true});
        verb.includes.loadViews('*.md', {cwd: userDir('docs/includes')});
        verb.layouts.loadViews('*.md', {cwd: userDir('docs/layouts')});
        verb.docs.loadViews('*.md', {cwd: userDir('docs')});
      }

      var collections = loadDefaults(verb);
      if (collections) {
        for (var key in collections) {
          var collection = collections[key];
          for (var name in collection) {
            if (!verb.views[key][name]) {
              verb.views[key][name] = collection[name];
            }
          }
        }
      }
    });
  };
};

function loadDefaults(app) {
  if (loaded) return views;
  loaded = true;

  var docs = path.join.bind(path, __dirname, '../../docs/src/readme');
  app.includes.loadViews('*.md', {cwd: docs('includes')});
  app.layouts.loadViews('*.md', {cwd: docs('layouts')});
  app.docs.loadViews('*.md', {cwd: docs()});

  // cache views
  views.includes = app.views.includes;
  views.layouts = app.views.layouts;
  views.docs = app.views.docs;
  return views;
}
