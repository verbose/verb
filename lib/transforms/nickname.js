'use strict';

module.exports = function nickname(verb) {
  var data = verb.cache.data;

  if (data.name.indexOf('helper-') !== -1) {
    return verb.data({nickname: data.name.slice(7)});
  }

  if (data.name.indexOf('transform-') !== -1) {
    return verb.data({nickname: data.name.slice(10)});
  }

  if (data.name.indexOf('route-') !== -1) {
    return verb.data({nickname: data.name.slice(6)});
  }

  if (data.name.indexOf('plugin-') !== -1) {
    return verb.data({nickname: data.name.slice(7)});
  }
};
