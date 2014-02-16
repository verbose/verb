---coffee
user = 'jonschlinkert'
reverse = (src) ->
  src.split('').reverse().join('')
---

{%= user %}
{%= reverse(user) %}
