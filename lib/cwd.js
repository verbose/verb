const path = require('path');

module.exports = function (cwd) {
  if (cwd) {
    return path.resolve(cwd);
  } else {
    return process.cwd();
  }
};