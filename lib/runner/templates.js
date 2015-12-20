'use strict';

var fs = require('fs');
var path = require('path');
var create = require('./create');
var loaded, views = {};

module.exports = function(options) {
  var includes = require('../templates/includes');
  var badges = require('../templates/badges');

  return function(verb) {
    verb.use(create(options));

    verb.on('config-loaded', function() {
      verb.includes(includes);
      verb.badges(badges);

      // get the user's CWD
      var userDir = path.join.bind(path, process.cwd());

      // load lib files, for API documentation
      verb.jsFiles(['*.js', 'lib/*.js'], {cwd: userDir()});

      // load root files, including `.verb.dm`
      verb.docs('*', {cwd: userDir(), dot: true});

      // load templates from `docs` directory
      verb.includes('*.md', {cwd: userDir('docs/includes')});
      verb.layouts('*.md', {cwd: userDir('docs/layouts')});
      verb.docs('*.md', {cwd: userDir('docs')});

      // load `verb` built-in templates onto the instance
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
  app.includes('*.md', {cwd: docs('includes')});
  app.layouts('*.md', {cwd: docs('layouts')});
  app.docs('*.md', {cwd: docs()});

  // cache views
  views.includes = app.views.includes;
  views.layouts = app.views.layouts;
  views.docs = app.views.docs;
  return views;
}
