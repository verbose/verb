'use strict';

var fs = require('fs');
var path = require('path');
var resolve = require('resolve');
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

    // title = section.title || title;

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
  verb.helper('depdocs', function(name, filename, context) {
    if (typeof filename !== 'string') {
      context = filename;
      filename = null;
    }

    var main = resolve.sync(name, {basedir: process.cwd()});
    var fp = main;
    var pkg = {};

    if (filename) {
      var dir = path.dirname(main);
      pkg = require(path.join(dir, 'package.json'));
      fp = path.resolve(dir, filename);
    }

    this.app.docs.addView(fp, {
      dest: utils.toGithub(pkg.repository, filename),
      content: fs.readFileSync(fp)
    });

    var fn = apidocs({delims: ['{%', '%}']});
    return fn.call(this, fp, context);
  });

  verb.helper('copyright', require('helper-copyright')({
    linkify: true
  }));

  verb.asyncHelper('related', utils.related({verbose: true}));
  verb.asyncHelper('reflinks', utils.reflinks({verbose: true}));

  verb.helper('gt', function(a, b, fn, efn) {
    console.log(arguments);
    if (a > b) {
      return fn;
    }
    return efn;
  });

  verb.asyncHelper('npm', function(cb) {
    var request = require('request');
    var JSONStream = require('JSONStream');

    var url = 'https://api.npmjs.org/downloads/range/';
    url += '1900-01-01';
    url += ':' + '3000-01-01';
    url += '/' + this.context.name;
    var res = [];

    return request(url)
      .on('error', console.error)
      .pipe(JSONStream.parse('downloads.*'))
      .on('data', function(data) {
        res.push(data);
      })
      .on('end', function() {
        // do stuff with res
        var num = res.reduce(function(acc, obj) {
          return acc += obj.downloads;
        }, 0);
        // console.log(num)

        cb(null, num);
      });

    // 'https://api.npmjs.org/downloads/range/2015-11-01:2015-12-01/micromatch'
  });
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
