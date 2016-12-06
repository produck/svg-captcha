'use strict';

const assert = require('assert');
const path = require('path');
const opentype = require('opentype.js');

const fontPath = path.join(__dirname, '../fonts/Comismsh.ttf');
const font = opentype.loadSync(fontPath);
const ascender = font.ascender;
const descender = font.descender;

const defaultOption = {
	fontSize: 72,
	x: 0,
	y: 0,
	noise: 1
};

module.exports = function (text, options) {
	options = Object.assign({}, defaultOption, options);

	const ch = text.trim()[0];
	assert(ch, 'expect a string');

	const fontSize = options.fontSize;
	const fontScale = 1 / font.unitsPerEm * fontSize;

	const glyph = font.charToGlyph(ch);
	const width = glyph.advanceWidth ? glyph.advanceWidth * fontScale : 0;
	const left = options.x - (width / 2);

	const height = (ascender + descender) * fontScale;
	const top = options.y + (height / 2);
	const path = glyph.getPath(left, top, fontSize);

	const pathData = path.toPathData();

	return pathData;
};
