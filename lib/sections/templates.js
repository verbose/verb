'use strict';

var fs = require('fs');

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
  coverage: {
    heading: 'Coverage summary',
    content: 'As of version {%= version %}\n\n```\n{%= coverage(\'coverage/summary.txt\') %}\n```\n',
    validate: function(verb, base, env) {
      return fs.existsSync(env.user.cwd + '/coverage');
    }
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
