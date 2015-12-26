'use strict';

var utils = require('../utils');

module.exports = function(verb, base, env) {
  var apidocs = require('helper-apidocs');
  var issue = require('helper-issue');

  verb.helper('resolve', function (name) {
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

  verb.helper('apidocs', apidocs({delims: ['{%', '%}']}));
  verb.helper('copyright', require('helper-copyright')({
    linkify: true
  }));

  verb.asyncHelper('related', utils.related({verbose: true}));
  verb.asyncHelper('reflinks', utils.reflinks({verbose: true}));
};
