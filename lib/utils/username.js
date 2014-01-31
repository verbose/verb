exports.extract = function(str) {
  return str.replace(/^([^:]+):\/\/(?:.+)\/(.+)\/(?:.+)/, '$2');
};