'use strict';

var _ = require('lodash');

/**
 * Transform for loading the `{%= shield() %}` helper
 */

var badge = {
  npm: '[![{%= name %}](http://img.shields.io/npm/v/{%= name %}.svg)](https://www.npmjs.org/package/{%= name %})',
  npm2: '[![{%= name %}](http://img.shields.io/npm/dm/{%= name %}.svg)](https://www.npmjs.org/package/{%= name %})',
  nodei: '[![{%= name %}](https://nodei.co/npm/{%= name %}.png?downloads=true "{%= name %}")](https://nodei.co/npm/{%= name %})',
  travis: '[![Build Status](http://img.shields.io/travis/{%= name %}.svg)](https://travis-ci.org/{%= name %})',
};

module.exports = function(verb) {
  verb.helper('shield', function (name, locals) {
    var ctx = _.extend({}, this.context, locals);
    return verb.render(badge[name], ctx);
  });
};
