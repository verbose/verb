---
verb_docs:
  tags: ['template', 'built-in', '.verb.md', 'layout']
  title: Default layout
---
# {%= name %} {%= badge('npm') %} {%= badge('travis') %}

> {%= description %}

<!-- toc -->

{% if (verb.sections.install !== false) { %}
## Install
{%= include('install-npm', {save: true}) %}
{% } %}

{% body %}

{% if (verb.related && verb.related.list && verb.related.list.length) { %}
## Related projects
{%= verb.related.description || '' %} 
{%= related(verb.related.list) %}  
{% } %}

## Running tests
{%= include("tests") %}

## Contributing
{%= include("contributing") %}

## Author
{%= include("author") %}

## License
{%= copyright({linkify: true}) %}
{%= license %}

***

{%= include("footer") %}
