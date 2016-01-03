'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('../utils');

module.exports = function(verb, base, env) {
  var apidocs = require('helper-apidocs');
  var issue = require('helper-issue');

  verb.helper('resolve', function(name) {
    var base = path.resolve(process.cwd(), 'node_modules', name);
    var pkg = require(path.join(base, 'package.json'));
    var cwd = path.join(base, pkg.main);

    var res = {};
    res.pkg = pkg;
    res.cwd = path.relative(process.cwd(), cwd);
    res.dest = pkg.homepage;
    return res;
  });

  verb.helper('exists', function(fp) {
    return fs.existsSync(fp);
  });

  verb.asyncHelper('section', function(title, name, locals, cb) {
    if (typeof locals === 'function') {
      cb = locals;
      locals = {};
    }

    var opts = utils.merge({}, verb.options, this.context.view.options);
    var view = this.app.includes.getView(name);

    if (!view) {
      cb(new Error('section helper cannot find include: ' + name));
      return;
    }

    var section = opts.section[name];
    if (section === false) {
      cb(null, '');
      return;
    }

    var ctx = {};
    ctx = utils.merge({}, ctx, this.context.view.data);
    ctx = utils.merge({}, ctx, this.context);
    ctx = utils.merge({}, ctx, view.locals, view.data);
    ctx = utils.merge({}, ctx, locals);

    if (utils.isObject(section)) {
      ctx = utils.merge({}, ctx, section);
    }

    view.render(ctx, function(err, res) {
      if (err) return cb(err);
      var str = '';
      if (title.charAt(0) !== '#') {
        str = '## ' + title + '\n';
      } else {
        str = title + '\n';
      }
      str += res.content;
      cb(null, str);
    });
  });

  verb.helper('log', function(msg) {
    console.log.apply(console, arguments);
  });

  verb.helper('require', function(name) {
    return utils.tryRequire(name);
  });

  verb.helper('get', function(key) {
    return utils.get(this.context, key);
  });

  verb.helper('shield', function(type) {
    return 'https://img.shields.io/' + type + '/{%= author.username %}/{%= name %}.svg';
  });

  verb.helper('date', require('helper-date'));
  verb.helper('issue', function(options) {
    var opts = utils.extend({}, options);
    opts.owner = opts.owner || utils.get(this, 'context.author.username');
    opts.repo = this.context.name;
    return issue(opts);
  });

  verb.helper('example', function(str, name) {
    return example(str, name).trim();
  });

  verb.helper('read', function(fp) {
    return fs.readFileSync(fp, 'utf8');
  });
  verb.helper('apidocs', apidocs({delims: ['{%', '%}']}));
  verb.helper('copyright', require('helper-copyright')({
    linkify: true
  }));

  verb.asyncHelper('related', utils.related({verbose: true}));
  verb.asyncHelper('reflinks', utils.reflinks({verbose: true}));
};

/**
 * Create a code example from the contents of the specified
 * JavaScript file.
 *
 * ```js
 * {%%= example("foo", {name: "my-module"}) %}
 * ```
 *
 * @param  {String} `fp` The path of the file to include.
 * @param  {String} `options`
 *   @option {String} `name` Replace `./` in `require('./')` with the given name.
 * @return {String}
 */

function example(str, name) {
  if (typeof str !== 'string') {
    throw new TypeError('example-helper expects a string.');
  }
  return str.replace(/\((['"])\.\/\1\)/g, '(\'' + name + '\')');
}
