import { isNil } from 'lodash';
import cc from 'cli-color';

const grey = cc.xtermSupported ? cc.xterm(241) : cc.blackBright;
const red = cc.red;
const bgWhite = cc.bgWhite;

function spaces(count) {
  return new Array(count).join(' ');
}

export default function excerpt({ contents, line, column }) {
  const report = [];

  // add source lines
  if (!isNil(contents) && !isNil(line)) {
    const lines = [];

    const sourceSplit = contents.toString().split('\n');
    let linesToShow = 8;
    const maxDigits = String(line).length + 1;

    // iterate backwards through the <=8 lines that are in the excerpt
    let l = Math.min(sourceSplit.length, line + 4) + 1;
    while (l-- > 1 && linesToShow-- > 0) {
      const digitGap = spaces(maxDigits - String(l).length);

      const numbering = '  ' + digitGap + l + ' ┃ ';
      let code = sourceSplit[l - 1];
      let text;

      if (l === line) {
        if (column) {
          code = (
            code.substring(0, column) +
            bgWhite(red(code.charAt(column))) +
            code.substring(column + 1)
          );
        }

        text = numbering + code;
      }
      else text = grey(numbering + code);

      lines.unshift(text);
    }

    report.push(lines.join('\n'));
  }

  // put it together
  return report.join('\n');
}
