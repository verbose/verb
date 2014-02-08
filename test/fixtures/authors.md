# Authors
{% authors().forEach(function(author) { %}
+ [{%= author.name %}]({%= author.url %}) {% }); %}