#!/usr/bin/env sh

alias browserify='../node_modules/.bin/browserify'
alias cdl='../node_modules/.bin/cdl'

# brsfy is only needed for tests, so not setting environment var to keep it from applying
browserify main.js > main-bundle.js
cdl main-bundle.js
