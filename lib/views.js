'use strict';

var includes = require('readme-includes');
var badges = require('readme-badges');
var loader = require('assemble-loader');
var utils = require('./');

/**
 * Default `viewTypes`
 *  | includes
 *  | layouts
 *  | pages
 *  | files
 */

module.exports = function (app) {
  app
    .use(loader())
    .use(function (app) {
      return function (collection) {
        if (!collection.isCollection) return collection;
        var fn = this.getView;

        this.getView = function (name) {
          return fn.apply(this, arguments) || this.loadView(name, {
            ext: '.md'
          });
        };
        return this;
      };
    });

  app.data({
    author: {name: 'Jon Schlinkert'},
    twitter: {username: 'jonschlinkert'},
    github: {username: 'jonschlinkert'},
    runner: {
      name: app.get('cache.data.name'),
      url: app.get('cache.data.repository'),
    }
  });

  app.create('includes', {
    viewType: ['partial'],
    renameKey: function (key) {
      var cwd = app.options.cwd;
      if (!cwd || key.indexOf(cwd) === -1) {
        return key;
      }
      var len = cwd.length + 1;
      return key.slice(len);
    },
    cwd: includes,
    engine: 'md',
  });

  app.create('badges', {
    viewType: ['partial'],
    renameKey: function (key) {
      var cwd = app.badges.options.cwd;
      if (!cwd || key.indexOf(cwd) === -1) {
        return key;
      }
      var len = cwd.length + 1;
      return key.slice(len);
    },
    cwd: badges,
    engine: 'md'
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

  app.include('npm', {
    content: '[![total downloads](https://img.shields.io/npm/dt/{%= name %}.svg)](https://www.npmjs.com/package/{%= name %})'
  });

  app.include('license', {
    content: 'Copyright © 2015 {%= author.name %}\nReleased under the {%= license %} license.'
  });

  app.create('files');
};
