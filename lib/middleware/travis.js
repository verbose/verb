'use strict';

var fs = require('fs');
var url = require('url');
var path = require('path');
var writeYaml = require('write-yaml');
var _ = require('lodash');


var re = /.*:\/\/github.com\/(.*)\.git/;

var dirname = /^(\/?|[\s\S]*?)([^\/]+?|)$/;
var basename = /(?:[^\/]+?)$/;
var name = /([^\/]+?)(\.[^.]*$|$)/;
var ext = /\.([^.\/]*|)$/;

module.exports = function(verb) {
  var travis = path.join(process.cwd(), '.travis.yml');
  var exists = fs.existsSync(travis);
  var data = verb.cache.data;

  return function (file, next) {
    var url = verb.get('data', 'repostory.url');
    // console.log(url);

    // var pathname = url.parse(repo.url).pathname;
    // // console.log(pathname)
    // console.log(dirname.exec(pathname))

    // var res = repo.url.replace(re, 'https://travis-ci.org/$1');

    if (verb.enabled('travis badge') && !data.hasOwnProperty('travis')) {
      verb.data({travis: {"language": "node_js", "node_js": ["0.10", "0.11"]}});
    }
    next();
  };



  // try {
  // var url = context.repository.url;

  //   /**
  //    * If `.travis.yml` does not exist, and
  //    * `travis: true` is defined in the options,
  //    * then add a `.travis.yml` file to the root
  //    * of the project.
  //    *
  //    * @title Travis CI badge
  //    */

  // if (options.travis && !file.exists(app.cwd('.travis.yml'))) {
  //   var travis = file.match('*travis.yml', tmpl, {matchBase: true})[0];

  //   // Save the file
  //   file.writeFileSync('.travis.yml', file.readFileSync(travis));
  //   // Log a success message
  //   app.log.success('Saved:', '.travis.yml');
  // }


  //   /**
  //    * If `.travis.yml` already exists, add
  //    * a travis URL to the context for use
  //    * in templates
  //    *
  //    * @title Travis CI badge
  //    */

  //   if(file.exists(app.cwd('.travis.yml'))) {
  //     app.context.travis = url.replace(re, 'https://travis-ci.org/$1');
  //   }

  // } catch (e) {
  //   e.origin = __filename;
  //   console.warn(e);
  // }
};