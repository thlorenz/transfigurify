'use strict';

var findParent = require('find-parent-dir')
  , path = require('path');

var resolvedTxs = {};

function transforms(packfile, env) {
  var  pack = require(packfile);
  return (pack.transfigurify && pack.transfigurify[env]) || null
}

exports = module.exports = 

/**
 * Attempts to resolve transforms that have been transfigured for the given environment inside the package.json
 * of the package that the file is part of.
 * 
 * @name resolveTransforms
 * @function
 * @param {string} file full path to the file
 * @param {string} env  the given transfigurify environment
 * @param {function} cb called back with error or transforms (null if none were transfigured given the conditions).
 */
function resolveTransforms(file, env, cb) {
  var txs = resolvedTxs[file];

  // assuming that env will never change during the lifetime of this module
  if (txs !== undefined) return cb(null, txs);

  findParent(file, 'package.json', function (err, dir) {
    if (err) return cb(err);
    if (!dir) return cb(null, null); // no package.json? -- that's ood

    var packfile = path.join(dir, 'package.json');

    txs = transforms(packfile, env);
    resolvedTxs[file] = txs;

    cb(null, txs);
  });
};

// used for testing
exports.clearCache = function () { resolvedTxs = {} }
