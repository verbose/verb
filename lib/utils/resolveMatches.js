var path = require('path');
var find = require('find');
var verb = require('../../');

/**
 * Resolve matches.
 * @param   {[type]}  name      [description]
 * @param   {[type]}  filepath  [description]
 * @return  {[type]}            [description]
 */

module.exports = function(name, filepath) {
  filepath = verb.cwd(filepath);
  var dir = path.dirname(path.join(filepath, name));
  name = path.basename(name);
  return find.fileSync(name, dir);
};
