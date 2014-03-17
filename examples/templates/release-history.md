## Release History
{% if (history) {
  var i = 0;
  _.each(history, function(change) {
    change.version = _.keys(history)[i];
    if (change.date instanceof Date) {
      change.date = moment(change.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
    }
    // Print out the columns
    print('\n * ' + [
      change.version,
      change.date,
      change.changes.join(' '),
    ].join('\u2003\u2003\u2003'));
    // Increment
    i++;
  });
} else { %}
_(Nothing yet)_
{% } %}
