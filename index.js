#! /usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');
const { kill } = require('process');
const chalk=require("chalk"); 
// this is not supported in the latest version of chalk
// look into dynamic import later

program
  .version('0.0.1')
  .argument('[filename]', 'Name of a file to execute')
  .action(async ({ filename }) => {
    const name = filename || 'index.js';

    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`could not find the file ${name}`)
    }

    let proc;

    const start = debounce(() => {
      if (proc) {
        console.log(chalk.red(`killed proc.id = ${proc.pid} \n`))
        proc.kill();
      }
      console.log('starting process \n')
      proc = spawn('node', [name], { stdio: 'inherit' });
      console.log(chalk.green(`proc.id = ${proc.pid} \n`))
    }, 100);

    chokidar
      .watch('.')
      .on('add', start)
      .on('change', start)
      .on('unlink', start);
  });

program.parse(process.argv)