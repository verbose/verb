
var Config = require('map-config');

module.exports = function (app, config) {
  var config = app.locals.cache;
  var keys = Object.keys(app.views);
  var views = {};

  keys.forEach(function (key) {
    var instance = app[key];

    views[key] = function (config) {
      var mapper = new Config({
        options: 'option',
        set: 'set',
        addViews: 'addViews'
      }, instance);

      console.log('loading templates from config: "' + key + '"');
      return mapper.process(config);
    };
  });

  var collections = new Config(views);
  var configMap = new Config({
    collections: function (config) {
      return collections.process(config);
    },
    helpers: 'helpers',
    asyncHelpers: 'asyncHelpers'
  }, app);

  configMap.process(config);

  // configMap.process({
  //   "ignore": [
  //     ".git"
  //   ],
  //   "deps": {
  //     "include": [
  //       "readme-includes",
  //       "readme-badges"
  //     ],
  //     "ignore": [
  //       "support"
  //     ]
  //   },
  //   "collections": {
  //     "docs": {
  //       "options": {
  //         "cwd": "fixtures/foo"
  //       },
  //       "set": {
  //         "a.b.c": "d"
  //       }
  //     },
  //     "includes": {
  //       "options": {
  //         "cwd": "fixtures/bar"
  //       }
  //     },
  //     "badges": {
  //       "options": {
  //         "cwd": "fixtures/baz"
  //       },
  //       "addViews": {
  //         "foo": "this is a badge"
  //       }
  //     }
  //   },
  //   "helpers": {
  //     "whatever": "@/helper-related"
  //   },
  //   "related": {
  //     "list": [
  //       "composer",
  //       "assemble",
  //       "template",
  //       "engine"
  //     ]
  //   },
  //   "reflinks": [
  //     "jsdiff",
  //     "option-cache",
  //     "template",
  //     "plasma",
  //     "config-cache"
  //   ]
  // });

  // // console.log(verb.docs.get('a.b.c'));
  // console.log(verb._.helpers);
};
