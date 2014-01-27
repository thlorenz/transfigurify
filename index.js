'use strict';

var resolve        = require('./resolve-transforms')
  , combine        = require('stream-combiner')
  , through        = require('through2')
  , applyTransform = require('apply-transform')

exports = module.exports = 

function (file) {
  var env = exports.env;

  if (!env) return through();

  var data = ''
  return through(read, flush);

  function read(d, _, cb) { data += d; cb(); }
  function flush(cb) {
    var self = this;

    resolve(file, env, function (err, txs) {
      if (err) return cb(err);

      if (!txs) {
        self.push(data);
        return cb();
      }

      var combinedTransform = combine.apply(null, txs);

      applyTransform(combinedTransform, data, function (err, src) {
        if (err) return cb(err);
        self.push(src);
        cb();
      })
    });
  }
};


/**
 * The env variable which is used by transfigurify to determine which transforms config in the `package.json` to use
 * in order to apply transforms.
 *
 * You need to set this or provide it via the `TRANSFIGURIFY_ENV` environment variable.
 *
 * ### Example
 *
 *  ```js
 *  // setting from javascript
 *  transfigurify.env = 'test';
 *  ```
 *
 *  ```sh
 *  # setting from command line
 *  TRANSFIGURIFY_ENV=test browserify -t transfigurify ...
 *  ```
 * 
 * @name transfigurify::env
 * 
 */
exports.env = process.env.TRANSFIGURIFY_ENV;

// Test
function run(env, file, window, cb) {
  var transfigurify = exports;
  transfigurify.env = env;

  var ctx = { window: window };
  var fullPath = require.resolve(__dirname + '/test/dev-test/' + file);

  browserify()
    .require(fullPath)
    .transform(transfigurify)
    .bundle(function (err, res) {
      if (err) return cb(err);
      console.error('bundled');
      console.error(res);
      try {
        var require_ = vm.runInNewContext(res, ctx);
        cb(null, require_(fullPath));
      } catch (e) {
        cb(e);
      }
    });
}

if (!module.parent && typeof window === 'undefined') {
  
var browserify    = require('browserify')
  , vm            = require('vm')

process.env.EXPOSIFY_CONFIG='{ "jq": "$" }';

run('test', 'test.js', {}, function (err, res) {
  if (err) return console.error('error', err);
  console.dir(res);
})

}
