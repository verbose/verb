'use strict';

var fs = require('fs');

module.exports = {
  title: {
    level: 1,
    heading: '{%= name %} {%= badge(\'npm\') %} {%= badge(\'travis\') %}',
    content: '> {%= description %}\n\n<!-- toc -->',
  },
  install: {
    level: 2,
    heading: 'Install',
    content: '{%= include(\'install-npm\', {save: true}) %}',
  },
  apidocs: {
    level: 2,
    heading: 'API',
    content: '{%= section("apidocs") %}',
  },
  related: {
    level: 2,
    heading: 'Related projects',
    content: '{%= related(verb.related.list) %}',
  },
  tests: {
    level: 2,
    heading: 'Running tests',
    content: '{%= include("tests") %}',
  },
  coverage: {
    level: 2,
    heading: 'Coverage summary',
    content: 'As of version {%= version %}\n\n```\n{%= coverage(\'coverage/summary.txt\') %}\n```\n',
    validate: function(app) {
      if (app && app.env) {
        return fs.existsSync(app.env.user.cwd + '/coverage');
      }
      return true;
    }
  },
  contributing: {
    level: 2,
    heading: 'Contributing',
    content: '{%= include("contributing") %}',
  },
  author: {
    level: 2,
    heading: 'Author',
    content: '{%= include("author") %}',
  },
  license: {
    level: 2,
    heading: 'License',
    content: '{%= copyright() %}\n{%= license %}'
  },
  footer: {
    level: 2,
    heading: '***',
    content: '{%= include("footer") %}'
  }
};
