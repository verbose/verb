'use strict';

var lazy = require('lazy-cache')(require);
lazy('mixin-deep', 'merge');
lazy('question-cache', 'questions');
lazy('ask-once', 'ask');

module.exports = function (options) {
  return function (app) {

    /**
     * add a `questions` property to the Verb instance
     * @type {Object}
     */

    this.questions = lazy.questions(options);

    /**
     * Ask a question, or use a pre-existing value
     * to populate the answer.
     */

    app.mixin('ask', function (locals) {
      var ctx = lazy.merge({}, this.cache.data, locals || {});
      var ask = lazy.ask({
        questions: this.questions,
        store: this.store,
        data: ctx
      });

      return function () {
        return ask.apply(ask, arguments);
      };
    });

    /**
     * Set a question to ask at a later point.
     */

    app.mixin('question', function () {
      this.questions.set.apply(this.questions, arguments);
      return this;
    });
  };
};
