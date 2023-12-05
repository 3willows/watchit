#! /usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');

console.log('hi there, index.js is running');

program
  .version('0.0.1')
  .argument('[filename]', 'Name of a file to execute')
  .action((args) => {
    const start = debounce(() => {
      console.log("starting users' programme")
    }, 100);
    
    chokidar
      .watch('.')
      .on('add', () => start)
      .on('change', () => console.log("FILE CHANGED"))
      .on('unlink', () => console.log("FILE UNLINKED"));
  });

program.parse(process.argv)