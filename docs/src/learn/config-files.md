For the needs of most projects, Verb won't require any configuration. The documentation, templates and data from packcage.json will be enough.

However, if you want to change how Verb builds documentation for your project there are a couple of options:

* `.verbrc.yml`: a YAML file used for basic settings, file paths, options, register plugins or custom tags, and other "non-dynamic" configuration.
* `verbfile.js`: a verbfile is similar in concept to a gruntfile or gulpfile, but entirely focused on your project's documentation so its much more limited in scope (not to mention, [grunt-verb](https://github.com/assemble/grunt-verb) and [gulp-verb](https://github.com/assemble/gulp-verb) can run verbfiles!). You can access the [Verb API](#api) with a verfile, and extend Verb with any custom programming you want. On the Assemble core team we say, "it's not magic, it's just JavaScript".

We'll be adding more documentation on these files and how to use them. Please [let us know if you have questions]({%= repository.url %})!