import 'babel-polyfill';
import cc from 'cli-color';
import fs from 'fs';
import isAbsolute from 'is-absolute';
import minimist from 'minimist';
import readableStack from './readableStack';
import stackTrace from 'stack-trace';
import excerpt from './excerpt';

const args = minimist(process.argv.slice(2));

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

// make stack traces more readable
process.on('uncaughtException', error => {
  let line;
  let column;
  // let contents;
  let message;
  let fileName;

  if (error._babel) {
    [fileName, message] = error.message.split(': ');

    line = error.loc.line;
    column = error.loc.column;
  }
  else {
    const stack = stackTrace.parse(error);
    const first = stack[0];

    line = first.getLineNumber();
    column = first.getColumnNumber();
    fileName = first.getFileName();
    message = error.message;
  }

  if (fileName && isAbsolute(fileName)) {
    // TODO: scripts run via babel-register seem not to have absolute pathnames
    // so we don't reach here... need a way to differentiate them from
    // names of builtins like 'path.js', 'module.js' which appear as relative.

    console.log(`\n${fileName}\n${excerpt({
      line, column,
      contents: fs.readFileSync(fileName),
    })}`);
  }

  console.log(`\n${cc.red(message.trim())}\n`);

  if (!error._babel) console.log(readableStack(error), '\n');

  process.exit(1);
});

// make sure promise rejections don't get swallowed
process.on('unhandledRejection', reason => {
  if (reason && reason instanceof Error) throw reason;

  const error = new Error('Unhandled rejection');
  error.reason = error;
  throw error;
});

require(args.file);
