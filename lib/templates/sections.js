'use strict';

module.exports = {
  apidocs: {
    heading: 'API',
    content: '{%= section("apidocs") %}',
  },
  related: {
    heading: 'Related projects',
    content: '{%= related(verb.related.list) %}',
  },
  tests: {
    heading: 'Running tests',
    content: '{%= include("tests") %}',
  },
  contributing: {
    heading: 'Contributing',
    content: '{%= include("contributing") %}',
  },
  author: {
    heading: 'Author',
    content: '{%= include("author") %}',
  },
  license: {
    heading: 'License',
    content: '{%= copyright() %}\n{%= license %}'
  },
  footer: {
    heading: '***',
    content: '{%= include("footer") %}'
  }
};
