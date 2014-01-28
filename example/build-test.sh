#!/usr/bin/env sh

alias browserify='../node_modules/.bin/browserify'
alias cdl='../node_modules/.bin/cdl'

# Applying environment var used by transfigurify to the browserify step
TRANSFIGURIFY_ENV=test browserify test.js > test-bundle.js
cdl test-bundle.js
