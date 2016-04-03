
## conflict reporter

> See conflicts in the command line!

To output conflicts, just run verb in `verbose` mode:

```bash
$ verb --verbose
```

**Example output**

![screen shot 2015-04-23 at 5 42 16 am](https://cloud.githubusercontent.com/assets/383994/7294451/9034dbfa-e97b-11e4-930e-372ef4012096.png)

**How it works**

In verbose mode, the conflict reporter tells you when there are problems with helpers and properties on the context. This works for "renderable" templates, like `.verb.md` (via a plugin) as well as includes (via a middleware).

For example, currently verb registers both a `license` data field and a `license()` helper (I kept the conflict so you can see how the manager works. Don't worry, verb handles it just fine now). Normally, both of these cannot exist on the same object at the same time, so only one of them will be merged onto the context. As a result, the template engine will throw an error when it tries to render either `{%= license %}` or `{%= license() %}`.

**Solution**

The conflict manager plugin detects these conflicts, then it temporarily renames the helper on the fly, re-registers it on the `__.` object, and deletes it from the data object. That way both the helper and data property will render as expected. (You might be thinking, "why would I have duplicate properties like that?" well, you personally might not, but if you want to use community templates or built-in templates that might have variables you're unaware of, and you want them to "just work", then this is not an uncommon thing...).

***

## visual diffs

See the difference between pre-render and post-render templates by running the following in the command line:

```js
$ verb --diff
```

**Example output**

![screen shot 2015-04-23 at 6 24 13 am](https://cloud.githubusercontent.com/assets/383994/7295197/96b5666a-e981-11e4-82f8-3587697fc910.png)
