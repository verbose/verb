# {%= name %} {%= badge("fury") %}

> {%= description %}

## Install
{%= include("install") %}

## Run tests

```bash
npm test
```

## Usage

```js
var <%= _.namify(appname) %> = require('{%= name %}');
console.log(<%= _.namify(appname) %>('abc'));
//=> ['a', 'b', 'c'];
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue][issues].

## Author
{%= include("author") %}

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}

[issues]: https://github.com/<%= username %>/<%= _.slugify(appname) %>/issues