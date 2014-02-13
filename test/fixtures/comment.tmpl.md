# Comments {% _.each(files, function(file) { %}

## [{%= file.name %}]({%= file.path %})
{% _.each(file.comments, function(comments) { %}
{% _.each(comments.comment, function(comment) { %}
{%= _.strip(comment.description) %}
{% _.each(comment.params, function(param) { %}
* `{%= param.name %}`: ({%= param.type %}): {%= param.description %}  {% }); %} {% }); %} {% }); %} {% }); %}