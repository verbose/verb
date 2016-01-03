# {%= name %} {%= badge('npm') %} {%= badge('travis') %}

> {%= description %}

{% if(verb.sections) { %}
{% for(var key in verb.sections) { %}
{%= sections(key, verb.sections[key]) %}
{% } %}
{% } %}