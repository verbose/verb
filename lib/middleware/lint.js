'use strict';

/**
 * Resolve conflicts between helpers and data
 * properties before rendering.
 */

var extend = require('extend-shallow');
var isTrue = require('is-true');
var get = require('get-value');

module.exports = function(app) {
  var config = extend({}, app.options, app.get('argv'));
  var lint = isTrue(config, 'nolint');

  var helpers = app.get('helpers') || [];
  var props = app.get('props') || [];
  var re = /\{%=([\s\S]+?)%}/;

  return function (file, next) {
    if (!lint) return next();
    var str = file.content, match;

    // detect template variables used in the current file
    while (match = re.exec(str)) {
      str = str.split(match[0]).join('');
      var prop = match[1].trim();
      if (props.indexOf(prop) === -1 && /^[\w.]+$/.test(prop)) {
        props.push(prop);
      }
      var helper = /([\w.]+)\(/.exec(prop);
      if (helper) {
        helper = helper[1].trim();
        if (helpers.indexOf(helper) === -1) {
          helpers = helpers.concat(helper);
        }
      }
    }

    props.sort().forEach(function (prop) {
      if (typeof app.get('data.' + prop) === 'undefined') {
        if (prop.indexOf('.') !== -1) {
          app.set('data.' + prop, {});
        } else {
          app.set('data.' + prop, '');
        }
        app.union('messages.missing.data', prop);
      }
    });

    helpers = helpers.reduce(function (res, helper) {
      var isMissing = typeof get(app._.helpers, helper) === 'undefined' && typeof get(app._.asyncHelpers, helper) === 'undefined';
      if (isMissing) {
        res.push(helper);
      }
      return res;
    }, []);

    if (helpers.length) {
      console.log(helpers.length + ' helpers missing:');
      console.log('', helpers.join(', '));
      app.union('messages.missing.helpers', helpers);
    }
    next();
  };
};
