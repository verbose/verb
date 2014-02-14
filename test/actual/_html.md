<!doctype html>
<html lang="en">
  <head>
    
  </head>
  <body>
    <div class="container bs-docs-container">
      <h1 id="phaser">phaser</h1>
<blockquote>
<p>Markdown documentation generator. Build docs from markdown, Lo-Dash templates, includes, and YAML front matter.</p>
</blockquote>
<p>Please <a href="https://github.com/jonschlinkert/phaser/issues/new">report any bugs or feature requests</a>, thanks!</p>
<h2 id="quickstart">Quickstart</h2>
<pre><code class="lang-bash">npm install phaser --save-dev
</code></pre>
<h2 id="examples">Examples</h2>
<p>Example document:</p>
<pre><code class="lang-js"># {%= name %}

&gt; {%= description %}

{%= toc %}

### Overview
{%= doc(&quot;overview.md&quot;) %}

### Options
{%= doc(&quot;options.md&quot;) %}

### Examples
{%= doc(&quot;examples.md&quot;) %}

### License and Copyright
{%= copyright %}
{%= license %}
</code></pre>
<h2 id="options">Options</h2>
<ul>
<li>defaults</li>
<li>options</li>
</ul>
<h3 id="metadata">metadata</h3>
<p>Type: <code>object|array|string</code></p>
<p>Default: <code>undefined</code></p>
<ul>
<li><code>string</code>: When defined as a string,</li>
</ul>
<h3 id="variable">variable</h3>
<p>Type: <code>string</code></p>
<p>Default: <code>undefined</code></p>
<p>Lo-Dash opts...</p>
<h3 id="namespace">namespace</h3>
<p>Type: <code>boolean|string</code></p>
<p>Default: <code>undefined</code> (options: <code>true</code>|<code>&quot;only&quot;</code>)</p>
<p>When <code>namespace</code> defined, an object is created for each data file, where the top level property on the object is the name of the file itself, and the data contained within the file is extended into that object. <a href="#namespacing">See examples</a>.</p>
<h2 id="config">Config</h2>
<ul>
<li>package.json | alt config object</li>
<li>metadata</li>
</ul>
<h3 id="metadata">metadata</h3>
<p>Unless overridden in the options, Phaser will attempt to process templates using only the data from your project&#39;s <a href="./package.json">package.json</a>. Thus, using only the default settings our context might look something like this:</p>
<pre><code class="lang-js">{
  &quot;name&quot;: &quot;phaser&quot;,
  &quot;description&quot;: &quot;Documentation generator. Build docs from markdown, Lo-Dash templates, includes, and YAML front matter.&quot;,
  &quot;version&quot;: &quot;0.1.0&quot;,
  &quot;homepge&quot;: &quot;https://github.com/jonschlinkert/phaser&quot;,
  &quot;dependencies&quot;: {
    &quot;fs-utils&quot;: &quot;~0.1.11&quot;,
    &quot;gray-matter&quot;: &quot;~0.2.3&quot;,
    &quot;findup-sync&quot;: &quot;~0.1.2&quot;,
    &quot;frep&quot;: &quot;~0.1.3&quot;,
    &quot;globule&quot;: &quot;~0.2.0&quot;,
    &quot;lodash&quot;: &quot;~2.4.1&quot;,
    &quot;marked-toc&quot;: &quot;~0.1.5&quot;,
    &quot;template&quot;: &quot;~0.1.3&quot;
  },
  // continued...
}
</code></pre>
<p>For the majority of projects, this will be enough. <em>But Phaser gives you as much flexibility as you need to extend the context.</em></p>
<h2 id="context">Context</h2>
<p>Your project&#39;s <a href="./package.json">package.json</a> will be used as the default config object, which is passed as context to templates. If no other config object is passed to the <code>config</code> option, and no metadata is passed in through other means, then this is the context that will be used to process your templates.</p>
<h3 id="overriding-default-config">Overriding default config</h3>
<p>As mentioned in the previous section, the default config object, <code>package.json</code>, can be explicitly overridden by passing an object to <code>options.config</code>. Example:</p>
<pre><code class="lang-js">// Raw object
phaser(str, {config: {name: &#39;foo&#39;}});

// String (filepath)
phaser(str, {config: &#39;path/to/*.json&#39;});
</code></pre>
<h3 id="extending-the-context">Extending the Context</h3>
<p>From least specific to most specific, this is how the context is extended. In other words, the <strong>last wins</strong>:</p>
<ul>
<li><code>filters|functions</code>: <a href="">Lo-Dash filters</a> and custom functions may be used to build up the context when other more conventional means aren&#39;t available. For example, an <code>authors()</code> mixin/function might be used to read the <a href="./AUTHORS">AUTHORS</a> file, and then extend the context with the names of the authors therein.</li>
<li><code>options</code>: Variables defined directly on the <code>options</code> object, e.g. <code>{name: &quot;phaser&quot;}</code>.</li>
<li><code>options.data</code>: Variables from the <code>options.data</code> property. This is a very flexible property:<ul>
<li><code>Object</code>: You may pass a raw object directly to the property, e.g. <code>{data: {name: &quot;phaser&quot;}}</code>.</li>
<li><code>String</code>If you pass a string, Phaser will try to require it. If that doesn&#39;t work, Phaser will try to read it in.</li>
<li>Minimatch (glob) patterns may be used, and with either JSON or YAML files, e.g. <code>{data: &#39;foo/bar/**/*.{json,yml}&#39;}</code></li>
</ul>
</li>
<li><code>metadata</code>: Front matter</li>
</ul>
<p>For example, let&#39;s say we need to extend the context with some data that isn&#39;t in our example <code>package.json</code>, such as <code>author.name</code>. We have a few options:</p>
<ul>
<li><code>options.data</code>: Define a raw <code>object</code>|<code>array</code> directly on the <code>options.data</code> object.</li>
<li>Front matter in the templates themselves</li>
<li>JSON / YAML data files, e.g. <code>foo.json</code>, <code>foo.yml</code> etc.</li>
</ul>
<h3 id="options-config-vs-options-data">options.config vs options.data</h3>
<p>Although the options are similar, they serve a different purpose:</p>
<ul>
<li><code>options.config</code>: overrides the default config object, so <strong>no data</strong> from <code>package.json</code> will be used as the context.</li>
<li><code>options.data</code>: extend the config object, so <strong>both</strong> data from <code>package.json</code> and from <code>options.data</code> will be used to extend the context.</li>
</ul>
<h4 id="raw">Raw</h4>
<p>Example:</p>
<pre><code class="lang-js">options: {
  author: {
    name: &quot;Jon Schlinkert&quot;,
    url: &quot;https://github.com/jonschlinkert&quot;
  }
}
</code></pre>
<h4 id="front-matter">Front Matter</h4>
<p>Example:</p>
<pre><code class="lang-markdown">---
username: jonschlinkert
---
Visit [some link](https://github.com/{%= username %}/foo) to learn more!
</code></pre>
<h4 id="data-files">Data files</h4>
<p><code>foo.json, bar/baz/*.json</code></p>
<pre><code class="lang-json">{
  &quot;author&quot;: {
    &quot;name&quot;: &quot;Jon Schlinkert&quot;,
    &quot;url&quot;: &quot;https://github.com/jonschlinkert&quot;
  }
}
</code></pre>
<h5 id="namespacing">namespacing</h5>
<p>Given we have a file named <code>author.json</code> with the following contents:</p>
<p><strong>namespace: false</strong></p>
<pre><code class="lang-json">{
  &quot;author&quot;: {
    &quot;name&quot;: &quot;Jon Schlinkert&quot;,
    &quot;url&quot;: &quot;https://github.com/jonschlinkert&quot;
  }
}
</code></pre>
<p><strong>namespace: true</strong>
The following object would be merged into the context:</p>
<pre><code class="lang-json">{
  &quot;author&quot;: {
    &quot;name&quot;: &quot;Jon Schlinkert&quot;,
    &quot;url&quot;: &quot;https://github.com/jonschlinkert&quot;
  }
}
</code></pre>
<h2 id="defaults">Defaults</h2>
<pre><code class="lang-js">{
  // Logging
  verbose: true,
  debug: &#39;tmp/ctx.json&#39;,

  // Metadata
  namespace: &#39;&#39;,

  // Extensions
  filters: &#39;test/filters/*.js&#39;,
  contributing: true,

  // Glob defaults
  matchBase: true,

  // Processing
  delimiters: [&#39;{%&#39;, &#39;%}&#39;],
  replacements: [],
}
</code></pre>
<h2 id="contributing">Contributing</h2>
<p>Find a bug? Have a feature request? Please <a href="https://github.com/jonschlinkert/phaser/issues">create an Issue</a>.</p>
<p>In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][], and build the documentation with <a href="https://github.com/assemble/grunt-readme">grunt-readme</a>.</p>
<p>Pull requests are also encouraged, and if you find this project useful please consider &quot;starring&quot; it to show your support! Thanks!</p>
<h2 id="authors">Authors</h2>
<p><strong>Jon Schlinkert</strong></p>
<ul>
<li><a href="https://github.com/jonschlinkert">github/jonschlinkert</a></li>
<li><a href="http://twitter.com/jonschlinkert">twitter/jonschlinkert</a></li>
</ul>
<h2 id="license">License</h2>
<p>Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license</p>
<hr>
<p><em>This file was generated by <a href="https://github.com/assemble/grunt-readme">grunt-readme</a> on .</em></p>

    </div>
  </body>
</html>