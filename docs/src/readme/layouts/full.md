# {%= name %} {%= badge('npm') %} {%= badge('travis') %}

> {%= description %}

{% body %}

{% if (verb.related && verb.related.list && verb.related.list.length) { %}
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

{% if (verb.reflinks) { %}
{% if (Array.isArray(verb.reflinks) && verb.reflinks.length) { %}
{%= reflinks(verb.reflinks) %}  
{% } else if (verb.reflinks.list && verb.reflinks.list.length) { %}
{%= reflinks(verb.reflinks.list) %}  
{% } %}
{% } %}
