'use strict';

/**
 * Resolve conflicts between helpers and data
 * properties before rendering.
 */

var get = require('get-value');

module.exports = function lint_(verb) {
  var helpers = verb.get('helpers') || [];
  var props = verb.get('props') || [];
  var re = /\{%=([\s\S]+?)%}/;

  return function (file, next) {
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
      if (typeof verb.get('data.' + prop) === 'undefined') {
        if (prop.indexOf('.') !== -1) {
          verb.set('data.' + prop, {});
        } else {
          verb.set('data.' + prop, '');
        }
        verb.union('missing.data', prop);
      }
    });

    helpers = helpers.reduce(function (res, helper) {
      var isMissing = typeof get(verb._.helpers, helper) === 'undefined'
        && typeof get(verb._.asyncHelpers, helper) === 'undefined';

      if (isMissing) {
        // verb.helper(helper, function () {
        //   // return '<!-- {%= ' + helper + '() %} is not defined!!! -->';
        // });
      }
      return res;
    }, []);

    if (helpers.length) {
      verb.set('missing.helpers', helpers);
    }

    next();
  };
};
