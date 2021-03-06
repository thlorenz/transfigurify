'use strict';

var browserify    = require('browserify')
  , vm            = require('vm')
  , fs            = require('fs')
  , resolve       = require('../resolve-transforms')
  , transfigurify = require('../')

function run(env, file, window, cb) {
  transfigurify.env = env;

  var ctx = { window: window };
  var fullPath = require.resolve(__dirname + '/dev-test/' + file);

  browserify()
    .require(fullPath)
    .bundle(function (err, res) {
      if (err) return cb(err);
      try {
        var require_ = vm.runInNewContext(res, ctx);
        var fn = require_(fullPath);
        return cb(null, fn);
      } catch (e) {
        cb(e);
      }
    });
}
var test = require('tap').test

function checkHbsfy(t, main) {
  t.deepEqual(
    main.hbs().split('\n')
  , [ '<!DOCTYPE html>',
      '<html>',
      '<head>',
      '  <title>Main</title>',
      '</head>',
      '<body>',
      '  <p> some paragraph </p> ',
      '</body>',
      '</html>',
      '' ]
  , 'applies hbsfy transform'
  ); 
}

test('\nrunning in test env which has brfs with test.js entry which has fs.readFileSync', function (t) {
  resolve.clearCache();
  run('test', 'test.js', {}, function (err, res) {
    if (err) { t.fail(err); return t.end(); }
    t.equal(res.mainTxt(), fs.readFileSync(__dirname + '/dev-test/' + 'main.js', 'utf8'), 'applies brfs transform configured for test');
    checkHbsfy(t, res);
    t.end();
  });
})

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

test('\nrunning in test env which does not have brfs with test.js entry which has fs.readFileSync', function (t) {
  resolve.clearCache();
  run('dev', 'test.js', {}, function (err, res) {
    if (err) { t.fail(err); return t.end(); }
    t.similar(res.mainTxt.toString(), /fs.readFileSync/, 'does not apply brfs transform')
    checkHbsfy(t, res);
    t.end();
  });
})
