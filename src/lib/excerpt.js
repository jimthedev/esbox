/* eslint-disable prefer-template */

import { isNil } from 'lodash';
import cc from 'cli-color';

const grey = cc.xtermSupported ? cc.xterm(241) : cc.blackBright;
const red = cc.red;

const maxLines = 8;

function spaces(count) {
  return new Array(count).join(' ');
}

export default function excerpt({ contents, line, column }) {
  const report = [];

  // add source lines
  if (!isNil(contents) && !isNil(line)) {
    const lines = [];

    let l = line + 1;
    let max = maxLines;
    const mostDigits = String(line).length + 1;
    const sourceSplit = contents.toString().split('\n');
    let digitGap;

    while (l-- > 1 && max-- > 0) {
      digitGap = spaces(mostDigits - String(l).length);
      let lineReport = '  ' + digitGap + grey(l) + grey(' ┃ ');

      if (l === line) lineReport += sourceSplit[l - 1]; // the error line: bright
      else lineReport += grey(sourceSplit[l - 1]); // non-error line: dim

      lines.unshift(lineReport);
    }

    report.push(lines.join('\n'));

    // add a line to show column of error
    if (!isNil(column)) {
      digitGap = spaces(mostDigits);
      report.push(
        digitGap + spaces(column + 5) +
        red('↑')
      );
    }
    else report.push('');
  }

  // put it together
  return report.join('\n');
}
