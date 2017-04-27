'use strict';

const path = require('path');
const alfy = require('alfy');
const PDFify = require('pdfify-node');

const source = alfy.input;

if (!source) {
  alfy.error('error.');
}

const destination = path.resolve(
  source.slice(0, source.indexOf('.md')) + '.pdf'
);

const pdfify = new PDFify({
  source: path.resolve(source),
  destination,
  style: null,
  header: null,
  height: null,
  repeat: false,
  debug: false,
  open: false,
  silent: true
});

pdfify.makeHTML().then(html => {
  pdfify.makePDF(html);
});
