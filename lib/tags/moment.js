var moment  = require('moment');
var _       = require('lodash');

module.exports = function(phaser) {
  // var phaserOpts = _.extend({}, phaser.options);
  // var filters = {};

  // filters.moment = function(context, block) {
  //   if (context && context.hash) {
  //     block = _.cloneDeep(context);
  //     context = undefined;
  //   }
  //   var date = moment(context);

  //   // Reset the language back to default before doing anything else
  //   date.lang('en');

  //   for (var i in block.hash) {
  //     if (date[i]) {
  //       date = date[i](block.hash[i]);
  //     } else {
  //       console.log('moment.js does not support "' + i + '"');
  //     }
  //   }
  //   return date;
  // };

  // filters.duration = function(context, block) {
  //   if (context && context.hash) {
  //     block = _.cloneDeep(context);
  //     context = 0;
  //   }
  //   var duration = moment.duration(context);

  //   // Reset the language back to default before doing anything else
  //   duration = duration.lang('en');

  //   for (var i in block.hash) {
  //     if (duration[i]) {
  //       duration = duration[i](block.hash[i]);
  //     } else {
  //       console.log('moment.js duration does not support "' + i + '"');
  //     }
  //   }
  //   return duration;
  // };

  // for (var filter in filters) {
  //   phaser.registerFilter(filter, filters[filter]);
  // }
  // return filters;
};