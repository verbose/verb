/**
 * Basic README scaffold.
 */

module.exports = [
  '# {%= name %}',
  '',
  '> {%= description %}',
  '',
  'Install with [npm](npmjs.org) `npm i {%= name %} --save-dev`',
  '',
  'Now that {%= name %} is installed, run: `{%= name %}`',
  '',
  '## Author',
  '{%= author.name %}',
  '',
  '## License',
  '{%= copyright() %}',
  '{%= license() %}'
].join('\n');