/*
	将 npm script 进行flatten操作
	
	举例，有如下npm script（仅用于说明，无实际意义）
	{
		"deploy": "npm run build-ios --test && npm run build-android && npm run deploy-remote",
		"build": "npm run build-ios && npm run build-android",
		"build-ios": "cp index.js index.io.js",
		"build-android": "cp index.js ios.android.js",
		"deploy-remote": "cp index.*.js /tmp"
	}

	当运行 npm run deploy，实际执行的是
		cp index.js index.io.js --test
		cp index.js ios.android.js
		cp index.*.js /tmp

	本脚本就是把 npm script 进行初步的 flatten 操作，返回实际运行的脚本（如上所示）
*/
const processArgv = process.argv; // node flatten.js deploy
const pkg = require('./package.json');
const cmd = processArgv[3] || 'start'; // 需要flatten的命令
const scripts = pkg.scripts;

// TODO 目前只支持 && 的分割，|| 还没支持
function walk(command) {
	// 分割命令，比如 xx && yy
	const cmdList = command
							.trim()
							.split(/&&|\|\|/)
							.map(c => c.trim()); // 去掉首尾空格
	const length = cmdList.length;
	const ret = [];

	for (let i = 0; i < length; i++) {
		const subCmd = cmdList[i];
		const isNpmScript = subCmd.indexOf('npm') === 0;

		// 类似 npm run xx 这样的命令需要展开
		if (isNpmScript === true) {
			// 比如 'npm run build-ios --test'
			const splitedSubCmd = subCmd.split(/\s+/); // 比如 ['npm', 'run', 'bundle', 'ios', '--test']
			const npmCmd = splitedSubCmd[2]; // 比如 build-ios
			const args = splitedSubCmd.slice(3); // 比如 --test
			const subCmdContent = scripts[npmCmd] + ' ' + args; // 比如 cp index.js index.io.js --test
			ret.push(...walk(subCmdContent));
		} else {
			ret.push(subCmd);
		}
	}

	return ret;
}

// 举例：npm run deploy 对应的脚本内容
const commandContent = scripts[cmd]; 
// flatten 后得到的脚本
const finalCmds = walk(commandContent);
console.log(finalCmds.join('\n'));