const file = require('fs-utils');
const _ = require('lodash');

/**
 * Expose fs-utils on verb
 */


var fs = {};

fs.read = file.readFileSync;
fs.write = file.writeFileSync;

module.exports = _.defaults(fs, file);