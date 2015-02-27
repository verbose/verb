'use strict';

/**
 * Called in the `init` transform. Adds the full
 * URL to the git repository to `verb.cache.data['repo-url']`
 *
 * ```js
 * verb.get('data.repo-url');
 * ```
 *
 * Github URLs
 *
 *  - `project`: 'foo/bar'
 *  - `owner`: 'foo'
 *  - `repo`: 'bar'
 */

module.exports = function(verb) {
  // github urls
  verb.transform('git', require('./git/repo'));

  // other urls
  verb.transform('github', require('./url/github'));
  verb.transform('project', require('./url/project'));
  verb.transform('bugs', require('./url/bugs'));
  verb.transform('homepage', require('./url/homepage'));
  verb.transform('repo-url', require('./repo'));
};
