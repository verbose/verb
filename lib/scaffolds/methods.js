module.exports = [
  '## API\n\n',
  '> <%= name %> methods\n\n',
  '<% _.forEach(data, function(fn) { %>',
  '### <%= fn %>\n',
  'Type: `undefined`\n\n',
  'Default: `undefined`\n\n',
  '<% }); %>'
].join('');