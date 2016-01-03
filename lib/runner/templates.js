'use strict';

var fs = require('fs');
var path = require('path');
var create = require('./create');
var utils = require('../utils');
var loaded, views = {};

module.exports = function(verb, base, env) {
  var includes = require('../../templates/includes');
  var badges = require('../../templates/badges');

  verb.use(create());
  for (var key in includes) {
    var view = includes[key];
    verb.includes.addView(key, { content: view });
  }

  verb.includes.addViews(includes);
  verb.badges.addViews(badges);

  // get the user's CWD
  var userDir = path.resolve.bind(path, process.cwd());

  // load lib files, for API documentation
  verb.jsFiles(['*.js', 'lib/*.js'], {cwd: userDir()});

  // load root files, including `.verb.dm`
  verb.docs('*', {
    ignore: ['*.sublime*', '.DS_Store'],
    cwd: userDir(),
    dot: true
  });

  if (fs.existsSync(userDir('docs'))) {
    // load templates from `docs` directory
    verb.includes('*.md', {cwd: userDir('docs/includes')});
    verb.layouts('*.md', {cwd: userDir('docs/layouts')});
    verb.docs('*.md', {cwd: userDir('docs')});
  }

  // load `verb` built-in templates onto the instance
  var collections = loadDefaults(verb);
  if (collections) {
    for (var key in collections) {
      var collection = collections[key];
      for (var name in collection) {
        if (!verb.views[key][name]) {
          var view = collection[name];
          verb[key](view.path, view);
        }
      }
    }
  }
};

function loadDefaults(app) {
  if (loaded) return views;
  loaded = true;

  var docs = path.resolve.bind(path, __dirname, '../../templates');
  var includesDir = docs('includes');
  var includes = utils.glob.sync('*.md', {cwd: includesDir});
  includes.forEach(function(fp) {
    fp = path.resolve(includesDir, fp);
    app.includes.addView(fp, {
      path: fp,
      contents: fs.readFileSync(fp)
    });
  });

  var layoutsDir = docs('layouts');
  var layouts = utils.glob.sync('*.md', {cwd: layoutsDir});
  layouts.forEach(function(fp) {
    fp = path.resolve(layoutsDir, fp);
    app.layouts.addView(fp, {
      path: fp,
      contents: fs.readFileSync(fp)
    });
  });

  var readmeDir = docs('readme');
  var docs = utils.glob.sync('*.md', {cwd: readmeDir});
  docs.forEach(function(fp) {
    fp = path.resolve(readmeDir, fp);
    app.docs.addView(fp, {
      path: fp,
      contents: fs.readFileSync(fp)
    });
  });

  // app.includes('*.md', {cwd: docs('includes')});
  // app.layouts('*.md', {cwd: docs('layouts')});
  // app.docs('*.md', {cwd: docs('readme')});

  // cache views
  views.includes = app.views.includes;
  views.layouts = app.views.layouts;
  views.docs = app.views.docs;
  return views;
}
