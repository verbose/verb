# {%= name %} {%= badge('npm') %} {%= badge('travis') %}

> {%= description %}

{% if (typeof options !== 'undefined' && options.toc) { %}
<!-- toc -->
{% } %}
## Install
{%= include("install-npm", {save: true}) %}

## Usage
{% body %}
{% if (verb && verb.related && verb.related.list && verb.related.list.length) { %}
## Related projects
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

{%= reflinks(verb.reflinks || []) %}
