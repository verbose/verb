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