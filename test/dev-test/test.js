'use strict';

var fs = require('fs');

exports.mainTxt = function () {
  return fs.readFileSync(__dirname + '/main.js');
}

exports.hbs = function () {
  return require('./main');
}
