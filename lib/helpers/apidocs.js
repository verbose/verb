
var comments = require('js-comments');

module.exports = function(app) {
  app.loader('apidocs', function(templates) {
    for (var key in templates) {
      if (templates.hasOwnProperty(key)) {
        var file = templates[key];
        var obj = comments.parse(file.content);
        file.content = comments.render(obj);
      }
    }
    return templates;
  });

  return function (patterns, opts) {
    var view = app.lookup('comments', patterns);
    return view.content;
  }
};
