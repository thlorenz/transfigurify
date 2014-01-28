# transfigurify example

Run it via: `npm explore transfigurify && npm install && npm run demo`

### package.json

```json
{
  "name": "dev-test",
  "version": "0.0.0",
  "description": "Fixture demonstrating transform options when running in test environment.",
  "main": "main.js",
  "browserify": {
    "transform": [
      "transfigurify"
    ]
  },
  "transfigurify": {
    "test": [
      "brfs"
    ]
  },
  "dependencies": {
    "brfs": "0.0.9",
    "transfigurify": "~0.1.0"
  }
}
```

In this example no transform will run unless `TRANSFIGURIFY_ENV=test`.

### Important part of build.sh

    browserify main.js > main-bundle.js

### Important part of test-build.sh

    TRANSFIGURIFY_ENV=test browserify test.js > test-bundle.js

### The code that is transformed if `brfs` is active

#### main.js

```js
exports.mainTxt = function () {
  // assuming this will only be called during tests for demonstration purposes
  // will be expanded via brfs when TRANSFIGURIFY_ENV=test, otherwise fs.readFileSync will be unchanged
  return fs.readFileSync(__dirname + '/main.js');
}
```
