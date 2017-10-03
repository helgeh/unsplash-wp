#! /usr/bin/env node
'use strict';

const meow = require('meow');
const chalk = require('chalk');
const unsplashWp = require('.');

const cli = meow(`
  Usage
    $ unsplash-wp <folder>

  Examples
    $ unsplash-wp "/home/unsplash-tmp/"
    You now have a new wallpaper from Unsplash!
`);

unsplashWp({unsplashStore: cli.input[0]}).then(() => {
  console.log(chalk.green('You now have a new wallpaper from Unsplash!'));
}).catch(err => {
  console.log(chalk.yellow('Sorry, no go...', err));
});