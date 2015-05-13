'use strict';

var get = require('get-value');
var _ = require('lodash');

/**
 * Convenience method for debugging.
 *
 * **Examples**
 *
 * ```js
 * {%= log(debug("app")) %}
 * {%= log(debug("app.cache.data")) %}
 *
 * {%= log(debug("file")) %}
 * {%= log(debug("file.data")) %}
 *
 * {%= log(debug()) %}
 * {%= log(debug("this")) %}
 * {%= log(debug("this.dest")) %}
 * ```
 * @todo move to a helper
 */

module.exports = function (app) {
  return function(file, next) {
    file.data.debug = file.data.debug || {};

    file.data.debug = function (prop) {
      var segs, root, type = typeof prop;
      if (type !== 'undefined') {
        segs = prop.split('.');
        root = segs.shift();
        segs = segs.join('.');
      }

      // get the (pseudo) context
      if (root === 'this' || root === 'context' || type === 'undefined') {
        var ctx = app.cache.data;
        _.merge(ctx, file.data);
        return filter(ctx, segs);
      }
      // get the file object
      if (root === 'file') {
        return filter(file, segs);
      }
      // get the app
      if (root === 'app') {
        return filter(app, segs);
      }
    };
    next();
  };
};

function filter(obj, prop) {
  var omitKeys = ['debug', '_contents', 'fn'];
  if (typeof prop !== 'string' || prop === '') {
    return _.omit(_.cloneDeep(obj), omitKeys);
  }
  return _.omit(_.cloneDeep(get(obj, prop)), omitKeys);
}
