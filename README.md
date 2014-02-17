# phaser [![NPM version](https://badge.fury.io/js/phaser.png)](http://badge.fury.io/js/phaser)  [![Build Status](https://travis-ci.org/assemble/phaser.png)](https://travis-ci.org/assemble/phaser)

> The most deadly markdown documentation generator in the Alpha Quadrant.

_Exactly_ like the one on Star Trek, except instead of "stun" and "kill", this Phaser generates markdown documentation. Making it hands-down the most deadly markdown documentation generator on the planet (and probably others ones too).

<!-- toc -->
* [Install](#install)
* [About](#about)
  * [Ease of Use](#ease-of-use)
  * [API](#api)
* [Features](#features)
  * [How does Phaser differ from Assemble?](#how-does-phaser-differ-from-assemble)
  * [How Phaser Works](#how-phaser-works)
* [Authors](#authors)
* [License](#license)

<!-- toc stop -->
Please [report any bugs or feature requests](https://github.com/assemble/phaser/issues/new), thanks!

![image](https://f.cloud.github.com/assets/383994/2181984/e30dc88c-9774-11e3-9bef-511e91b019b9.png)

## Install
#### Install with [npm](npmjs.org)

```bash
npm i phaser --save-dev
```

Now that Phaser is installed, run:

```
phaser
```

That wasn't so hard, was it?

## About
### Ease of Use

> Phaser loves users

So its number one priorty is ease-of use. For new users **zero configuration** is required to get started. Once Phaser is installed, simply enter `phaser` in command line, and you're off and running.

For more experienced users, Phaser offers _more than 50 template tags and filters, includes and partial caching, comment parsing, YAML Front Matter (or Coffee Front Matter!), plugins, mixins, tons of helpful JavaScript and Node.js utilites_, and lots more.

### API

> Phaser also loves developers

Offering an extensive API and tools for building plugins or extending Phaser in other ways.

## Features

* Lo-Dash templates and mixins
* The full power of JavaScript
* Filters
* Tags
* Partial Caching
* Mixins
* Templates can be used directly, cached as JavaScript, and/or via `require` statements
* Uses [gray-matter][] to support both YAML Front Matter and Coffee Front Matter
* Easily add a **Table of Contents** to any file
* Generate a **multi-file Table of Contents**, along with relative links to each file AND section
* Comment parsing (basic)
* Extensive API
* File-system Utilities
* Logging
* Lots more! So much more. Much much more. So much more that you don't even know how much more it's so much. I don't know where to start.

### How does Phaser differ from Assemble?

Phaser was specifically created to make it easier to manage documentation for GitHub projects. In a nutshell:

* Use [Assemble][] to build components, sites, blogs and other projects where HTML is the end result.
* Use Phaser to generate and maintain markdown documentation for your [Assemble][] (or non-Assemble) projects.

#### Comparison

While both engines can be extended to accomplish most of the following features, this table describes what you should expect from each _out-of-the-box_:

**Feature** | **[Assemble][]** | **Phaser**
------- | -------- | ------
**Summary** | Build HTML projects from modular components and data | Generate markdown documentation
**Focus** | Power, granular access to context, components | Speed, ease-of-use, command-line
**Template Engine** | Handlebars by default, any template engine can be added. | Lo-Dash
**Extensions** | Plugins, Lo-Dash Mixins, Helpers, Filters, Tags <sup>[1](#1-depends-on-the-template-engine)</sup> | Plugins, Lo-Dash Mixins, Filters, Tags
**Static Blogs** | Yes | No
**Static Sites** | Yes | No
**HTML Documentation** | Yes | Limited.
**Markdown Documentation** | Limited | Yes
**Markdown to HTML** | Yes | Limited

###### <sup>1</sup> Depends on the template engine.

[Assemble]: https://github.com/assemble/assemble
[gray-matter]: https://github.com/assemble/gray-matter


### How Phaser Works

Without getting into too much detail, Phaser disintegrates your templates, data, and front matter into a stream of molecules before being sent to the Pattern Buffer, which is a large cylindrical tank surrounded by superconducting electromagnetic coils. Here, the object to be generated is stored momentarily before actually beaming to its destination.

From the Pattern Buffer, the molecular stream and the coded instructions pass through a number of subsystems before reaching the emitter. These include the Subspace, Doppler, and Heisenberg Compensators. Each works to ensure that the received stream is being transmitted or re-materializing in the correct phase, frequency, and so on.

It's true. This is exactly how Phaser works. More or less.

## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated by [grunt-readme](https://github.com/assemble/grunt-readme) on Monday, February 17, 2014._