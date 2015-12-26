'use strict';

var sections = require('./templates');

module.exports = function(app, base, env) {
  for (var key in sections) {
    if (sections.hasOwnProperty(key)) {
      var section = sections[key];

      // call validation function, if defined on the template
      if (base && env && typeof section.validate === 'function') {
        if (!section.validate(app, base, env)) {
          continue;
        }
      }

      // load the template
      app.section(key, {content: buildContent(section)});
    }
  }
}

function buildContent(section) {
  var str = /^\w/.test(section.heading) ? '## ' : '';
  str += section.heading + '\n\n';
  str += section.content + '\n';
  return str;
}
