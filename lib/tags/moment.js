var moment  = require('moment');
var _       = require('lodash');

module.exports = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var filters = {};

  filters.moment = function(context, options) {
    var opts = _.extend({lang: 'en'}, phaserOpts, options);
    moment.lang(opts.lang);

    if(moment(context)._d != 'Invalid Date') {
      return moment(context);
    } else {
      return moment().format(context);
    }
  };

  // filters.duration = function(context, block) {
  //   if (context) {
  //     block = _.cloneDeep(context);
  //     context = 0;
  //   }
  //   var duration = moment.duration(context);

  //   // Reset the language back to default before doing anything else
  //   duration = duration.lang('en');

  //   for (var i in context) {
  //     if (duration[i]) {
  //       duration = duration[i](context[i]);
  //     } else {
  //       console.log('moment.js duration does not support "' + i + '"');
  //     }
  //   }
  //   return duration;
  // };

  // for (var filter in filters) {
  //   phaser.registerFilter(filter, filters[filter]);
  // }
  return filters;
};