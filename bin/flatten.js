#!/usr/bin/env node
const Flatten = require('../lib/flatten');

// console.log(process.argv);

// 需要flatten的命令
// 比如：node flatten.js deploy，cmd => deploy
const cmd = process.argv[2] || 'start';

// 打平后的命令
const flattenedCmds = Flatten.analyze(cmd);

console.log(`[log] Npm command to be flattened is [${cmd}]`);
console.log(`[log] Flattened commands are as follow ${cmd}\n`);

console.log(flattenedCmds.join('\n') + '\n');