'use strict';

module.exports = function(verb) {
  return verb.get('data.repository.url') || verb.get('data.repository');
};
