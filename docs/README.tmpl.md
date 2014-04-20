# {%= name %} {%= badge('fury') %}

> {%= description %}

* Use Verb to generate and maintain markdown documentation for your projects.
* Get [verb-cli](https://github.com/assemble/verb-cli) to use Verb globally from the command line
* Get [generator-verb](https://github.com/assemble/generator-verb) to add documentation templates, or initialize docs for new projects
* Read [the documentation](./DOCS.md) to learn more about Verb.

## Install
{%= include('install', {save: '--save-dev'}) %}

## Meet Verb
{%= docs('meet-verb') %}

## Customize
{%= docs('customize') %}

## Get some Verb in your toolchain
* Use [grunt-verb](https://github.com/assemble/grunt-verb) with your favorite JavaScript task runner.
* Use [gulp-verb](https://github.com/assemble/gulp-verb) with your streaming build systems.

## Test
{%= docs("test") %}

## Release history
{%= changelog() %}

## Contribute
{%= docs("contribute") %}

## Author
{%= contrib("jon") %}

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}