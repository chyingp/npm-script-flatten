# npm-script-flatten

`npm-script-flatten` is a small tool for flattening npm script.


## usage

```bash
npm install -g npm-script-flatten
npm-script-flatten deploy # your script to be flattened
```

## example

For example, npm script `deploy` defined in `package.json`

```json
"scripts": {
	"deploy": "npm run build-ios --test && npm run build-android && npm run deploy-remote",
	"build": "npm run build-ios && npm run build-android",
	"build-ios": "cp index.js index.io.js",
	"build-android": "cp index.js ios.android.js",
	"deploy-remote": "cp index.*.js /tmp"
}
```

When we run `npm-script-flatten deploy`, you will get the commands actually run.

```bash
cp index.js index.io.js --test
cp index.js ios.android.js
cp index.*.js /tmp
```