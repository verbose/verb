// Generate a Table of Contents. Use {%= toc %} in templates
var toc = module.exports = function(src) {
  return require('marked-toc')(src);
};