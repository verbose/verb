var configfiles = require('configfiles');

module.exports = function (config) {
  config.files = configfiles(config);
  return config;
};