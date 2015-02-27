'use strict';

var utils = require('../shared/utils');

module.exports = function(verb) {
  var github = utils.owner(verb.get('data.url.github'));
  verb.set('data.owner', github);
};
