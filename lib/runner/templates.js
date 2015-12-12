'use strict';

var fs = require('fs');
var path = require('path');
var create = require('./create');
var includes = require('./includes');
var badges = require('./badges');
var loaded, views = {};

module.exports = function(options) {
  return function(verb) {
    verb.use(create(options));

    /**
     * DEPRECATED in the next release: Load includes and badges
     */

    verb.on('config-processed', function() {
      for (var key in includes) {
        verb.include(key, {content: includes[key]});
      }

      for (var key in badges) {
        verb.badge(key, {content: badges[key]});
      }

      var userDocs = path.join.bind(path, process.cwd());
      if (fs.existsSync(userDocs())) {
        // api docs
        verb.libFiles.loadViews(['*.js', 'lib/*.js'], {cwd: userDocs()});

        // templates
        verb.docs.loadViews('*', {cwd: userDocs(), dot: true});
        verb.includes.loadViews('*.md', {cwd: userDocs('docs/includes')});
        verb.layouts.loadViews('*.md', {cwd: userDocs('docs/layouts')});
        verb.docs.loadViews('*.md', {cwd: userDocs('docs')});
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
