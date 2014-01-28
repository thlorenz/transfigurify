'use strict';

var si = (typeof setImmediate !== 'undefined') ? setImmediate : function (fn) { setTimeout(fn, 0); }

var findParent = require('find-parent-dir')
  , path = require('path')
  , requireModule = require('require-module');

var resolved_txfns = {};

function transforms(packfile, env) {
  var  pack = require(packfile);
  return (pack.transfigurify && pack.transfigurify[env]) || null
}

exports = module.exports = 

/**
 * Attempts to resolve transform functions that have been transfigured for the given environment inside the package.json
 * of the package that the file is part of.
 *
 * These have to be invoked with the `file` in order to get the actual transform.
 * 
 * @name resolveTransforms
 * @function
 * @param {string} file full path to the file
 * @param {string} env  the given transfigurify environment
 * @param {function} cb called back with error or transforms (null if none were transfigured given the conditions).
 */
function resolveTransforms(file, env, cb) {
  var txfns = resolved_txfns[file];

  // assuming that env will never change during the lifetime of this module
  if (txfns !== undefined) return si(cb.bind(null, null, txfns));

  findParent(file, 'package.json', function (err, dir) {
    if (err) return cb(err);
    if (!dir) return cb(null, null); // no package.json? -- that's ood

    var packfile = path.join(dir, 'package.json');

    txfns = transforms(packfile, env);
    if (txfns) { 
      txfns = txfns.map(function (tx) { 
        var root = path.dirname(file);
        return requireModule(tx, root);
      })
    }

    resolved_txfns[file] = txfns;
    cb(null, txfns);
  });
};

// used for testing
exports.clearCache = function () { resolved_txfns = {} }
