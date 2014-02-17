## Release History
{% if (changelog) {
  changelog.forEach(function(details, version) {
    var date = details.date;
    if (date instanceof Date) {
      date = moment(date).format('YYYY-MM-DD');
    }
    print('\n * ' + [
      date,
      version,
      details.changes.join(' '),
    ].join('\u2003\u2003\u2003'));
  });
} else { %}
_(Nothing yet)_
{% } %}