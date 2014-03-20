module.exports = [
'{% _.each(files, function(file) { %}',
'## [{%= file.name %}]({%= file.path %})',
'{% _.each(file.comments, function(comments) { %}',
'{% _.each(comments, function(comment) { %}',
'{%= comment.name ? \'### [\' + comment.name + \'](\' + file.path + \'#L\' + comment.line + \')\': \'\' %}',
'{%= _.strip(comment.description) %}',
'{% _.each(comment.params, function(param) { %}',
'* `{%= param.name %}`: ({%= param.type %}): {%= param.description %}',
'{% }); %} {% }); %} {% }); %} {% }); %}'
].join('\n');