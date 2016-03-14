import builtins from 'builtin-modules';
import pathExists from 'path-exists';
import { isString } from 'lodash';
import stackTrace from 'stack-trace';
import isAbsolute from 'is-absolute';
import subdir from 'subdir';
import cc from 'cli-color';
import path from 'path';

const grey = cc.xtermSupported ? cc.xterm(241) : cc.blackBright;

export default function readableStack(error, options = { cwd: process.cwd() }) {
  const { cwd } = options;

  if (!(error instanceof Error)) return 'Not an error: ' + error;

  return stackTrace.parse(error).map(call => {
    const fileName = call.getFileName();
    const functionName = call.getFunctionName();
    const lineNumber = call.getLineNumber();
    const columnNumber = call.getColumnNumber();

    if (isString(fileName)) {
      const absolute = isAbsolute(fileName);
      const resolvedFileName = path.resolve(cwd, fileName);

      if (
        subdir(cwd, fileName) &&
        !subdir(path.join(cwd, 'node_modules'), resolvedFileName) &&
        (absolute || (
          builtins.indexOf(path.basename(fileName, '.js')) === -1 &&
          pathExists.sync(resolvedFileName)
        ))
      ) {
        // absolute and within CWD (but not in node_modules folder)
        // - highlight this line
        return (
          (functionName ? grey('  at ') + functionName : ' ') +
          grey(' in ') + path.join('./', path.relative(cwd, fileName)) +
          (lineNumber ? grey(':' + lineNumber + ':' + columnNumber) : '')
        );
      }

      // anywhere else - dim this line
      return grey(
        (functionName ? '  at ' + functionName : ' ') +
        ' in ' + path.relative(cwd, fileName) +
        (lineNumber ? ':' + lineNumber + ':' + columnNumber : '')
      );
    }

    // no filename - dim this line
    return grey(
      (functionName ? '  at ' + functionName : ' ') +
      ' in [unknown]'
    );
  }).join('\n');
}
