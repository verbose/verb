# {%= name %} {%= badge.npm %} {%= badge.travis %}

> {%= description %}

## Install
{%= include("install-npm", {save: true}) %}

## Usage
{% body %}

## Related projects
{%= related((verb.related && verb.related.list) || []) %}  

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
