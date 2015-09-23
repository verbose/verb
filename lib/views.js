'use strict';

var includes = require('readme-includes');
var badges = require('readme-badges');
var loader = require('assemble-loader');
var utils = require('./utils');

/**
 * Default `viewTypes`
 *  | includes
 *  | layouts
 *  | pages
 *  | files
 */

module.exports = function (app) {
  app.use(loader());
  app.use(utils.getView());

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
    renameKey: utils.rename,
    cwd: includes,
    engine: 'md',
  });

  app.create('badges', {
    viewType: ['partial'],
    renameKey: utils.rename,
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

  app.include('copyright', {
    content: 'Copyright © 2015, {%= author.name %}.'
  });

  app.include('license', {
    content: 'Released under the {%= ask("lslsl") %} license.'
  });

  app.include('author', {
    locals: {
      author: {name: 'Brian Woodward'},
      username: 'doowb'
    },
    content: [
      '**{%= author.name %}**',
      '',
      '+ [github/{%= username %}](https://github.com/{%= username %})',
      '+ [twitter/{%= username %}](http://twitter.com/{%= username %})',
    ].join('\n')
  });

  app.badge('travis', {
    content: '[![Build Status](https://travis-ci.org/{%= repository %}.svg)](https://travis-ci.org/{%= repository %})'
  });

  app.badge('fury', {
    content: '[![NPM version](https://badge.fury.io/js/{%= name %}.svg)](http://badge.fury.io/js/{%= name %})'
  });

  app.create('files');
};
