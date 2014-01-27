'use strict';

var fs = require('fs');

var go = module.exports = function () {
  var main = fs.readFileSync(__dirname + '/main.js');
  return main;
};
