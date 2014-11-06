'use strict';

var fs = require('fs');
var path = require('path');
var minimatch = require('minimatch');
var _ = require('lodash');


module.exports = function(name, options) {
  var opts = _.extend({}, this.options, options);

  var o = this.context;
  var prepend = 'Released under the ';

  try {
    if (o.licenses) {
      return prepend + _.pluck(o.licenses, 'type').join(', ') + ' license' + (o.licenses.length < 1 ? 's' : '');
    } else if (o.license) {
      if (typeof o.license === 'object') {
        return prepend + o.license.type + ' license';
      }
      if (typeof o.license === 'string') {
        return prepend + o.license + ' license';
      }
    }
  } catch (err) {
    err.origin = __filename;
    console.warn('No "license" or "licenses" properties found.', err);
  }
};



  // if (typeof name === 'object') {
  //   options = name;
  //   name = null;
  // }

  // if (typeof name === 'string') {
  //   var filepaths = _.filter(licenses, function(filepath) {
  //     return path.basename(filepath) === name;
  //   });

  //   // if no matches, then try minimatch
  //   if (!filepaths || filepaths.length <= 0) {
  //     filepaths = licenses.filter(minimatch.filter(name));
  //   }

  //   return filepaths.map(function(filepath) {
  //     var content = fs.readFileSync(filepath, 'utf8');
  //     return content;
  //   });
  // }