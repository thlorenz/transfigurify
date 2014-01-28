'use strict';
var fs = require('fs');

exports = module.exports = function () {
  console.log('hello from main.js');
}

exports.mainTxt = function () {
  // assuming this will only be called during tests for demonstration purposes
  // will be expanded via brfs when TRANSFIGURIFY_ENV=test, otherwise fs.readFileSync will be unchanged
  return fs.readFileSync(__dirname + '/main.js');
}
