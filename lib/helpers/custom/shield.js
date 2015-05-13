'use strict';

var _ = require('lodash');

/**
 * Transform for loading the `{%= shield() %}` helper
 * These aren't really implemented yet. this is a
 * placeholder for better logic
 */

module.exports = function (verb) {
  verb.badge('npm', '[![{%= name %}](http://img.shields.io/npm/v/{%= name %}.svg)](https://www.npmjs.org/package/{%= name %})');

  verb.badge('npm2', '[![{%= name %}](http://img.shields.io/npm/dm/{%= name %}.svg)](https://www.npmjs.org/package/{%= name %})');

  verb.badge('nodei', '[![{%= name %}](https://nodei.co/npm/{%= name %}.png?downloads=true "{%= name %}")](https://nodei.co/npm/{%= name %})');

  verb.badge('travis', '[![Build Status](http://img.shields.io/travis/{%= name %}.svg)](https://travis-ci.org/{%= name %})');

  return function shield(name, locals) {
    var ctx = _.extend({}, this.context, locals);
    return this.app.render(verb.views.badges[name], ctx);
  };
};
