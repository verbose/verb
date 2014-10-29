# {{{%= shortname(name) %}}} {%= badge("fury") %}

> {%= description %}

## Install
{%= include("install", {save: '--save-dev'}) %}

## Run tests

```bash
npm test
```

## Usage

```js
var helper = require('{%= name %}');
```

### With Assemble

If you use Assemble (v0.6.x), to register the helper for use with any template engine:

```js
var assemble = require('assemble');
assemble.registerHelper('<%= _.appName(name, "helper") %>', require('{%= name %}'));
```

### Handlebars helper (non-Assemble)

To use as a handlebars helper in non-Assemble projects:

```js
var Handlebars = require('handlebars');
Handlebars.registerHelper('<%= _.appName(name, "helper") %>', require('{%= name %}'));
```

## Author
{%= include("author") %}

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}