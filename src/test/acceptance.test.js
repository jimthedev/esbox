import test from 'ava';
import execa from 'execa';
import path from 'path';

const cli = path.resolve(__dirname, '..', 'lib', 'cli.js');
const fixture = path.resolve(__dirname, '..', '..', 'fixture');

test('outputs help text when run with no arguments', async t => {
  const result = await execa(cli);

  t.is(result.stderr, '');
  t.regex(result.stdout, /ES2016 in a box/);
});


test('works', async t => {
  const result = await execa(cli, [
    '--no-watch',
    '--cwd', fixture,
    'demo',
  ]);

  t.is(result.stderr, '');
  t.regex(result.stdout, /it works/);
});
