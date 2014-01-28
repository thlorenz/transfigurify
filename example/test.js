'use strict';

var fs = require('fs');
var main = require('./main');

exports.mainTxt = function () {
  return main.mainTxt; 
}

exports.hello = function () {
  return main();
}
