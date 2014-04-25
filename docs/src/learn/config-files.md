For the needs of most projects, Verb won't require any configuration. The documentation, templates and data from packcage.json will be enough.

However, if you want to change how Verb builds documentation for your project there are a couple of options:

* `.verbrc.yml`: a YAML file used for basic settings, file paths, options, register plugins or custom tags, and other "non-dynamic" configuration.
* `verbfile.js`: a verbfile is similar in concept to a gruntfile or gulpfile, but entirely focused on your project's documentation so its much more limited in scope (not to mention [grunt-verb](https://github.com/assemble/grunt-verb) and [gulp-verb](https://github.com/assemble/gulp-verb) can run verbfiles!). Verbfiles are useful for configuring plugins, custom tags, custom source and dest paths, and so on. You can access the [Verb API](#api) with a verfile, or extend Verb with any custom programming you want.

We'll be adding more documentation on these files and how to use them. Please [let us know if you have questions]({%= repository.url %})!


## .verbrc.md

1. Look for a `.verbrc.md` file in the root of the project. This is Verb's signature "markdown config" file, which can include both markdown content and YAML front matter for configuration.

_There are more ways to