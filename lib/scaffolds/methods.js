var template = module.exports = {};

template.list = [
  '{% _.forEach(list, function(fn) { %}',
  '* {%- fn %}\n',
  '{% }); %}'
].join('');


template.md = [
  '{% _.forEach(list, function(fn) { %}',
  '## {%- fn %}\n',
  'Type: `undefined`\n\n',
  'Default: `undefined`\n\n',
  '{% }); %}'
].join('');


template.yaml = [
  '# =============================================',
  '# API methods for {%= name %}',
  '# =============================================',
  '{% _.forEach(list, function(fn) { %}',
  '{%- fn %}:',
  '  type:        undefined',
  '  default:     foo',
  '  description: bar',
  '  example:     baz',
  '{% }); %}'
].join('\n');