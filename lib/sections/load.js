'use strict';


module.exports = function(app) {
  var sections = require('../../templates/sections');

  for (var key in sections) {
    if (sections.hasOwnProperty(key)) {
      var section = sections[key];

      // call validation function, if defined on the template
      if (typeof section.validate === 'function') {
        if (!section.validate(app)) {
          continue;
        }
      }

      // load the template
      app.verb_section(key, {content: buildContent(section)});
    }
  }
}

function buildContent(section) {
  var str = /^\w/.test(section.heading) ? '## ' : '';
  str += section.heading + '\n\n';
  str += section.content + '\n';
  return str;
}
