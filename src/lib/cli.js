#!/usr/bin/env node

import 'babel-polyfill';
import 'source-map-support/register';
import clearTrace from 'clear-trace';
import cc from 'cli-color';
import fs from 'fs';
import meow from 'meow';
import path from 'path';
import { debounce } from 'lodash';

const red = cc.red;
const black = cc.black;
const bgWhite = cc.xtermSupported ? cc.bgXterm(250) : cc.bgWhite;
const brown = cc.xtermSupported ? cc.xterm(137) : cc.yellow;
const grey = cc.xtermSupported ? cc.xterm(241) : cc.blackBright;

const help = `
  ${bgWhite('                       ')}
  ${bgWhite(`  📦  ${black('ES2016 in a box')}   `)}
  ${bgWhite(`     ${grey('git.io/esbox')}      `)}
  ${bgWhite('                       ')}

  ${brown('usage')}
    ${grey('>')} esbox ${grey('FILENAME')}

  ${brown('flags')}
    --cwd=${grey('DIRECTORY')}   run in a different directory
    --no-watch        only run your script once
    --no-clear        disable clearing the display before each run
    --version         show esbox version
`;

// register babel require hook
{
  // choose optimal config for the current engine
  const presets = [require('babel-preset-stage-0')];
  const nodeVersion = Number(process.versions.node.split('.')[0]);
  if (nodeVersion > 4) presets.push(require('babel-preset-es2015-node5'));
  else if (nodeVersion === 4) presets.push(require('babel-preset-es2015-node4'));
  else presets.push(require('babel-preset-es2015'));

  require('babel-register')({
    presets,
    ignore: /node_modules/,
  });
}

// get input from command line (and automate --help etc)
const { input, flags } = meow(
  {
    help,
    description: false,
  },
  {
    default: {
      cwd: null,
      clear: true,
      watch: true,
    },
    string: ['cwd'],
    boolean: ['clear', 'watch'],
    alias: {
      v: 'version',
    },
  }
);

// if called with no arguments, treat the same as --help
if (!input.length) {
  console.log(help);
  process.exit(0);
}

// assert there's only one argument
if (input.length > 1) {
  console.log(help);
  console.error(red('Cannot run esbox with more than one file argument.'));
  process.exit(1);
}

// unpack flags
const { clear, watch } = flags;
const cwd = flags.cwd ?
  path.resolve(flags.cwd) :
  process.cwd();

// ensure we're running in the correct directory
if (cwd !== process.cwd()) process.chdir(cwd);

// make stack traces more readable
process.on('uncaughtException', error => {
  console.log(clearTrace(error, { cwd }));
});

// make sure promise rejections don't get swallowed
process.on('unhandledRejection', reason => {
  if (reason && reason instanceof Error) throw reason;

  const error = new Error('Unhandled rejection');
  error.reason = error;
  throw error;
});

// determine the real path to the user's script
const userScript = (() => {
  let name = path.resolve(cwd, input[0]);

  // add .js extension if necessary
  if (!fs.existsSync(name)) name = `${name}.js`;

  // give up if not found
  if (!fs.existsSync(name)) {
    console.error(red(`Not found: ${input[0]}`));
    process.exit(1);
  }
  return name;
})();

// function to clear the display and run the user's script
const run = debounce(() => {
  if (clear) {
    process.stdout.write('\u001bc');
  }

  console.log(brown(`📦  ${path.relative(cwd, userScript)}`));

  require(userScript); // TODO - catch compilation errors and print excerpt
}, 10, { maxWait: 1000 });

// start up
if (watch) {
  const sane = require('sane');

  const onFileEvent = (name, root) => {
    if (!/\.js$/.test(name)) return;

    delete require.cache[path.resolve(root, name)];

    run();
  };

  const watcher = sane(cwd);

  watcher.on('add', onFileEvent);
  watcher.on('change', onFileEvent);
  watcher.on('delete', onFileEvent);

  watcher.on('ready', run);
}
else run();
