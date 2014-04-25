# Get to know Verb

## Ease of Use

> Verb loves users

Verb's number one priorty is ease-of use. For new users **zero configuration** is required to get started. Once Verb is installed, simply enter `docs` in command line, and you're off and running.

For more experienced users, Verb offers _more than 50 template tags and filters, includes and partial caching, comment parsing, YAML Front Matter (or Coffee Front Matter!), plugins, mixins, tons of helpful JavaScript and Node.js utilites_, and lots more.

## API

> Verb loves developers

Verb has an extensive API and tools for building plugins, custom tags and filters, or extending Verb in other ways.

Once installed globally, running `verb` at the command line will read  any files in the `./docs` directory of your project. This is easily customized


## How does Verb work?

Upon running the `docs` command, unless instructed to do otherwise Verb will attempt to build any markdown templates found in the `docs/` directory of your project, using the data from project's package.json as context.

For many users, Verb might only be used to [build the readme](#TODO: link to readme example) for projects, so that project metadata such as version, date, changelog and so on, are always current and consistent. See the [Verb generator](https://github.com/jonschlinkert/generator-docs) for examples.

**Beyond the basics**

For users who want more than the basics, Verb is also highly configurable via options and offers an [extensive API](#TODO: add link to API docs) for developers who want to add functionality in the form of plugins, middleware, custom tags, filters and so on.

## Why use Verb?

We all know that documenation can be one of the most challenging and time-consuming aspects of maintaining a project. Even for small projects, simply writing and organizing the content on a readme can take more time than it did to create the library itself.

> Verb dramatically reduces the time and effort involved in maintaining markdown docs for code projects through the use of powerful utilities and tools, well-defined conventions, and sensible defaults that are specifically tuned to maintaining projects on GitHub.

For starters, this is accomplished by:

1. Using templates for any sections or text than can be generaralized, such as _badges_, _license_, _copyright_, _author_, _Table of Contents_ and so on.
1. Allowing includes (partials) to be used, so that longer documents can be easily organized and broken down into logical topics or groupings.
1. Pulling in data from package.json to pass as context to any templates. Custom data sources may be used as well.
1. Using boilerplates to kickstart the documentation for new projects. The [Verb generator]() for Yeoman comes with a handful of boilerplates, but it's super easy to create and use your own.


## Introduction to {%= name %}

> {%= description %}

This project's goal is simple:

* Anything that can be generalized should be. Re-writing sections such as _license_, _copyright_, _author_ every time you create a new project is a big time sink.

Verb takes some of the burden out of this process by

* _templatizing_ certain elements of your documentation.
*

For example:

```markdown
{%= docs("extras/example-readme", {raw: true}) %}
```

Add some markdown files to the `./docs` directory of your project and run `verb` to [generate your documentation](#core-concepts).

_(TODO: add screen shots showing how the `docs` folder is used by the `{%%= docs() %}` tag, and how includes come from node modules, etc)_

## Why use Verb?

* It's dead simple
* Configuration is optional, but not necessary
* Sensible defaults
* Super fast

_Zero configuration is required, but Verb has a robust [API](#TODO) and is highly configurable via options._
