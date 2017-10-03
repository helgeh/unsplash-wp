#! /usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');
const main = require('./main');

program
	.version('0.1.0')
	.parse(process.argv);

main().then(response => {
	console.log(chalk.green('YEY'));
}).catch(err => {
	console.log(chalk.orange('Sorry, no go...', err));
});