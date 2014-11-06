'use strict';

var _ = require('lodash');

module.exports = function (verb) {
  return function (file, next) {
    // var data = _.extend({}, verb.context, verb.cache.data, file.data);
    // console.log(data)
    // if(!verb.context.username) {
    //   try {
    //     var username = verb.context.repo.split('/')[0];

    //     verb.context.username = username;
    //   } catch(e) {
    //     e.origin = __filename;
    //     var msg = 'Cannot find "username" on the context. ';
    //     console.warn(msg + e);
    //   }
    // }
    next(null, file);
  };
};
// normalize.license = function (pkg, options) {
//   options = options || {};
//   var type = '', url = '';

//   // Already formatted as an array, return.
//   if (pkg.licenses && pkg.licenses.length > 0)  {
//     return pkg;

//   } else if (isObject(pkg.license)) {
//     type = pkg.license.type;
//     url = pkg.license.url;
//     delete pkg.license;

//   } else if (typeOf(pkg.license) === 'string') {

//     if (options.license && options.license === true) {
//       return pkg;
//     }

//     var inferred = utils.inferLicenseURL(pkg.license);
//     type = inferred.type;
//     url = inferred.url;
//     delete pkg.license;

//   } else if (typeOf(pkg.license) === 'undefined') {

//   } else {
//     // If none of the above, something is amiss
//   }

//   pkg.licenses = [{
//     type: type,
//     url: url
//   }];

//   return pkg;
// };