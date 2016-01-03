'use strict';

var toc = require('markdown-toc');
var utils = require('../../utils');

/**
 * Add a TOC to the context of a view
 */

exports.create = function(app, append) {
  return function(view, next) {
    view.options.toc = view.options.toc || {};
    var opts = utils.merge({append: append}, app.options, view.options);

    if (view.isType('partial') || opts.toc === false) {
      next();
      return;
    }

    view.options.toc.hasMarker = hasMarker(view);
    if (view.options.toc.hasMarker && !view.data.toc) {
      view.data.toc = toc(view.content).content;
    }
    next();
  };
};

exports.inject = function(app, append) {
  return function(view, next) {
    var str = view.data.toc;

    if (!str || view.options.toc.hasMarker === false) {
      return next();
    }

    if (append) {
      str += '\n\n' + append;
    }

    view.content = injectToc(view.content, str);
    next();
  };
};

function hasMarker(view) {
  return view.content.indexOf('<!-- toc -->') !== -1;
}

function stripToc(str) {
  str = str.split('<!-- rendered_toc -->').join('');
  str = str.split('<!-- toc -->').join('');
  return str;
}

function injectToc(str, toc) {
  if (!toc) return str;
  str = str.split('<!-- rendered_toc -->').join(toc);
  str = str.split('<!-- toc -->').join(toc);
  return str;
}
