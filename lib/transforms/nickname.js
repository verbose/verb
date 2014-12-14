'use strict';

module.exports = function nickname(app) {
  var data = app.cache.data;

  if (data.name.indexOf('helper-') !== -1) {
    app.data({nickname: data.name.slice(7)});
  }

  if (data.name.indexOf('transform-') !== -1) {
    app.data({nickname: data.name.slice(10)});
  }

  if (data.name.indexOf('route-') !== -1) {
    app.data({nickname: data.name.slice(6)});
  }

  if (data.name.indexOf('plugin-') !== -1) {
    app.data({nickname: data.name.slice(7)});
  }
};
