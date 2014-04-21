var methods = require('list-methods');

module.exports = function(verb) {

  var route = function(src, options) {
    var list = methods(path.resolve(src));

    return foo;
  };

  var options = {
    tags: [route]
  };

  verb.copy(src, dest, options);
};