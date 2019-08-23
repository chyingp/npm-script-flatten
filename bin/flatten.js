#!/usr/bin/env node
const Flatten = require('../lib/flatten');


// command need to be flattened
// for example, 'node flatten.js deploy'command is 'deploy'
const cmd = process.argv[2] || 'start';

// flattened command
const flattenedCmds = Flatten.analyze(cmd);

console.log(`[log] Npm command to be flattened is [${cmd}]`);
console.log(`[log] Flattened commands are as follow ${cmd}\n`);

console.log(flattenedCmds.join('\n') + '\n');