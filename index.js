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

    resolve(file, env, function (err, txfns) {
      if (err) return cb(err);

      if (!txfns) {
        self.push(data);
        return cb();
      }

      var txs = txfns.map(function (txfn) { return txfn(file) });
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

// used for testing
exports.clearCache = resolve.clearCache; 
