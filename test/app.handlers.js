require('should');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var resolve = require('resolve-glob');
var support = require('./support');
var App = support.resolve();
var app;

function read(views) {
  return function (view) {
    view.read = function () {
      if (!this.contents) {
        this.contents = fs.readFileSync(this.path);
      }
    };
    return view;
  }
}

describe('handlers', function () {
  describe('custom handlers', function () {
    beforeEach(function () {
      app = new App();
      app.create('pages')
        .use(read)
        .option('renameKey', function (key) {
          return path.basename(key);
        });
    });

    it('should add custom middleware handlers:', function () {
      app.handler('foo');
      app.router.should.have.property('foo');
      assert.equal(typeof app.router.foo, 'function');
    });

    it('should add custom middleware handlers:', function () {
      app.pages.on('view', function (view) {
        console.log(view.read)
        // view.read();
      });

      app.handler('foo');
      app.handler('bar');

      app.foo(/./, function (view, next) {
        view.one = 'aaa';
        next();
      });

      app.bar(/./, function (view, next) {
        view.two = 'zzz';
        next();
      });

      app
        .pages('a', {contents: '...'})
        .pages('b', {contents: '...'})
        .pages('c', {contents: '...'})
        .use(function (pages) {
          // console.log(pages)
          var fn = pages.extendView;
          pages.extendView = function (view) {
            view = fn(view);
            app.handleView('foo', view);
            return view;
          };
          return pages;
        });
        // .pages('test/fixtures/pages/*.hbs')
        // .use(function (pages) {
        //   var fn = pages.extendView;
        //   pages.extendView = function (view) {
        //     view = fn(view);
        //     app.handleView('bar', view);
        //     return view;
        //   };
        //   return pages;
        // })

      // console.log(pages.getView('a.tmpl').one);
      // console.log(app.pages.getView('a.tmpl').one)
      // console.log(app.pages.getView('a.hbs').two)

      // app.pages.getView('a.txt').should.have.property('one');
      // app.pages.getView('a.txt').should.have.property('two');

      // app.pages.getView('a.md').should.not.have.property('one');
      // app.pages.getView('a.md').should.have.property('two');
    });

    // it('should add custom middleware handlers:', function () {
    //   app.handler('foo');
    //   app.handler('bar');

    //   function handle(method) {
    //     return function (view) {
    //       return app.handle(method, view);
    //     }
    //   }

    //   app.foo(/./, function (view, next) {
    //     view.one = 'aaa';
    //     next();
    //   });

    //   app.bar(/./, function (view, next) {
    //     view.two = 'zzz';
    //     next();
    //   });

    //   app.pages('test/fixtures/*.txt')
    //     .use(handle('foo'))

    //     .pages('test/fixtures/*.md')
    //     .use(handle('bar'))

    //     .use(utils.rename);

    //   app.pages.getView('a.txt').should.have.property('one');
    //   app.pages.getView('a.txt').should.have.property('two');

    //   app.pages.getView('a.md').should.not.have.property('one');
    //   app.pages.getView('a.md').should.have.property('two');
    // });
  });
});
