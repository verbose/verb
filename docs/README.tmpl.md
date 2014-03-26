# {%= name %} {%= badge('fury') %}

> {%= description %}

* Get [verb-cli](https://github.com/assemble/verb-cli) to use Verb globally from the command line
* Get [generator-verb](https://github.com/assemble/generator-verb) to add documentation templates, or initialize docs for new projects

## Meet Verb
{%= docs('meet-verb') %}

## Install
{%= include('install') %}

Be sure to install [Verb](https://github.com/assemble/verb) locally in projects that use Verb.

## Customize

Verb is easy to extend, here are some examples ([verb-cli](https://github.com/assemble/verb-cli) will automatically use these):

* [example verbfile](https://gist.github.com/jonschlinkert/9685280), with custom `src`, `dest` and metadata.
* [example verbfile with logging](https://gist.github.com/jonschlinkert/9685144)
* [example .verbrc.yml](https://gist.github.com/jonschlinkert/9686195)

## Get some verb in your toolchain

* Use [grunt-verb](https://github.com/assemble/grunt-verb) with your favorite JavaScript task runner.
* Use [gulp-verb](https://github.com/assemble/gulp-verb) with your streaming build systems.

## Test
{%= docs("test") %}

## Contribute
{%= docs("contribute") %}

## Author
{%= contrib("jon") %}

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}