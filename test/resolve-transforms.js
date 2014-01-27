'use strict';
/*jshint asi: true */

var test = require('tap').test
var resolve = require('../resolve-transforms');
var file = __dirname + '/dev-test/main.js';

test('\nresolving transforms for a file whose package.json has transfigurified transforms for the given env', function (t) {
  resolve.clearCache();

  resolve(file, 'test', function (err, txs) {
    if (err) { t.fail(err); return t.end(); }
    t.equal(txs.length, 1, 'one transform');

    t.deepEqual(txs[0].toString(), require('brfs').toString(), 'resolves the transforms');
    t.end();
  });
})

test('\nresolving transforms for a file whose package.json has not transfigurified transforms for the given env', function (t) {
  resolve.clearCache();
  resolve(file, 'dev', function (err, txs) {
    if (err) { t.fail(err); return t.end(); }
    t.equal(txs, null, 'resolves null');
    t.end();
  });
})
