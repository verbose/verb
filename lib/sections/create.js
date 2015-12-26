'use strict';

var utils = require('../../utils');

module.exports = function(val, verb) {
  return createSections(val);
};

function createSections(val, builtins) {
  if (Array.isArray(val)) {
    return sectionsArray(val, builtins);
  }
  if (utils.isObject(val)) {
    return sectionsObject(val, builtins);
  }
}

function createSection(val, builtins) {
  // do stuff to normalize section
  return formatSection(val);
}

function formatSection(section) {
  var content = '\n';

  if (section.prefix) {
    content += section.prefix;
  } else if (section.level) {
    content += new Array(section.level).join('#');
  }

  if (content !== '\n') content += ' ';
  content += section.heading || '';
  content += '\n\n';
  content += section.content || '';
  return content;
}

function sectionsArray(arr, builtins) {
  var len = arr.length, i = -1;
  var sections = '';
  while (++i < len) {
    sections += createSection(arr[i], builtins);
  }
  return sections.trim();
}

function sectionsObject(obj, builtins) {
  var sections = '';
  for (var key in obj) {
    sections += createSection(obj[key], builtins);
  }
  return sections.trim();
}
