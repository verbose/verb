## Release History
{% if (changelog) {
  changelog.forEach(function(details, version) {
    var detailsDate = details.detailsDate;
    if (detailsDate instanceof Date) {
      detailsDate = moment(detailsDate).format('YYYY-MM-DD');
    }
    print('\n * ' + [
      detailsDate,
      version,
      details.changes.join(' '),
    ].join('\u2003\u2003\u2003'));
  });
} else { %}
_(Nothing yet)_
{% } %}