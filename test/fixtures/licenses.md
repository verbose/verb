# Licenses

{% _.each(licenses, function(license) { %}
+ [{%= license.type %}]({%= license.url %}) {% }); %}