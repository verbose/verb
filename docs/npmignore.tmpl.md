---
dest: .npmignore
---
{%% if (ignore) {
  ignore.forEach(function(file) {
    print([file].join('\n'));
  });
} else { %}
test
{%% } %}