/**
 * Contrib scaffold. Used by the Assemble
 * core team.
 */

module.exports = [
  '# {%= name %} {%= badge("fury") %}',
  '',
  '> {%= description %}',
  '',
  '## Installion',
  '',
  '### [npm](npmjs.org)',
  '',
  '```bash',
  'npm i {%= name %} --save',
  '```',
  '',
  'Now that {%= name %} is installed, run: `{%= shortname(name) %}`',
  '',
  '## Authors',
  '{%= contrib("authors") %}',
  '',
  '## License',
  '{%= copyright() %}',
  '{%= license() %}'
].join('\n');
