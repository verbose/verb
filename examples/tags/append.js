/**
 * Example custom tag that appends a string to source content.
 *
 * @param   {String}  str  Source content
 * @return  {String}
 */

module.exports = function(verb) {
  var tags = {};

  tags.append = function(filepath, str) {
    var content = verb.file.read(filepath);
    return content + '\n' + str;
  };

  return tags;
};
