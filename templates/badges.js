'use strict';

module.exports = {
  travis: '[![Build Status](https://img.shields.io/travis/{%= author.username %}/{%= name %}.svg)](https://travis-ci.org/{%= author.username %}/{%= name %})',
  fury: '[![NPM version](https://img.shields.io/npm/v/{%= name %}.svg)](https://www.npmjs.com/package/{%= name %})',
  npm: '[![NPM version](https://img.shields.io/npm/v/{%= name %}.svg)](https://www.npmjs.com/package/{%= name %})',
  coveralls: '[![Coverage Status](https://img.shields.io/coveralls/{%= author.username %}/{%= name %}.svg)](https://coveralls.io/r/{%= author.username %}/{%= name %})'
};
