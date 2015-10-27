'use strict';

/**
 * Plugin for creating default view collections
 *  | includes
 *  | layouts
 *  | pages
 *  | files
 */

module.exports = function (app) {
  var includes = require('readme-includes');
  // var badges = require('readme-badges');
  var utils = require('./utils');

  app.create('includes', {
    viewType: ['partial'],
    renameKey: utils.rename,
    cwd: includes,
    engine: 'md',
  });

  app.create('badges', {
    viewType: ['partial'],
    renameKey: utils.rename,
    // cwd: badges,
    engine: 'md'
  });

  app.create('shields', {
    viewType: ['partial'],
    renameKey: utils.rename,
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

  app.question('foo', 'this is foo, yo!');

  app.shield('dt', {
    content: '[![total downloads](https://img.shields.io/npm/dt/{%= name %}.svg)](https://www.npmjs.com/package/{%= name %})'
  });
  app.shield('dm', {
    content: '[![monthly downloads](https://img.shields.io/npm/dm/{%= name %}.svg)](https://www.npmjs.com/package/{%= name %})'
  });

  app.include('npm', {
    content: '[![total downloads](https://img.shields.io/npm/dt/{%= name %}.svg)](https://www.npmjs.com/package/{%= name %})'
  });

  app.include('copyright', {
    content: 'Copyright © 2015, {%= author.name %}.'
  });

  app.include('license', {
    content: 'Released under the {%= ask("License") %} license.'
  });

  app.include('footer', {
    content: '_(TODO)_'
  });

  app.include('contributing', {
    content: '_(TODO)_'
  });

  app.include('tests', {
    content: '_(TODO)_'
  });

  app.include('install-global', {
    content: [
      'Install with [npm](https://www.npmjs.com/)',
      '',
      '```sh',
      '$ npm i -g {%= name %} --save',
      '```'
    ].join('\n')
  });

  app.include('author', {
    locals: {
      author: {
        name: 'Brian Woodward'
      },
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

  app.data({
    author: {
      name: 'Jon Schlinkert'
    },
    twitter: {
      username: 'jonschlinkert'
    },
    github: {
      username: 'jonschlinkert'
    },
    runner: {
      name: app.get('cache.data.name'),
      url: app.get('cache.data.repository'),
    }
  });
};
