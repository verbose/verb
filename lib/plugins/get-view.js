'use strict';

/**
 * Collection plugin for overriding the native `getView` method
 * from `templates` with a custom method that calls `loadView`
 * if the view isn't already cached and has a `path` property
 * indicating that the view is on the file system.
 */

module.exports = function(options) {
  return function (app) {
    if (this.isCollection)  {
      this.getView = getView(app, app.getView);
    }
    return function (views) {
      if (this.isCollection)  {
        this.getView = getView(views, views.getView);
      }
      return this;
    };
  };
};

function getView(app, fn) {
  return function (name) {
    return fn.apply(this, arguments) || this.loadView(name, {
      ext: '.md'
    });
  }.bind(app);
}
