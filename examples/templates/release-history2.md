## Release History
{% if (history) {
  _.each(history, function(details, version) {
    var detailsDate = details.date;
    if (detailsDate instanceof Date) {
      detailsDate = moment(detailsDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
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