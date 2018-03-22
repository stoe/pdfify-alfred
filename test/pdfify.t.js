'use strict';

import fs from 'fs';
import path from 'path';
import test from 'ava';
import execa from 'execa';

test.beforeEach(t => {
  t.context.testMd = path.resolve('./test/fixtures/pdfify.md');
  t.context.testPdf = path.resolve('./test/fixtures/pdfify.pdf');
});

test.afterEach(t => {
  const file = t.context.testPdf;

  fs.access(file, fs.constants.F_OK, err => {
    if (!err) {
      fs.unlinkSync(file);
    }
  });
});

test('pdfify', async t => {
  t.plan(3);

  const result = await execa('pdfify', [t.context.testMd, '--silent']);
  const pdfExists = fs.existsSync(t.context.testPdf);

  t.true(pdfExists, `${t.context.testPdf} not created`);

  t.is(result.cmd, `pdfify ${t.context.testMd} --silent`);
  t.is(result.failed, false);
});
