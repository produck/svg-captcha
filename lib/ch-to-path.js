'use strict';
const assert = require('assert');

module.exports = function (text, opts) {
	const ch = text[0];
	assert(ch, 'expect a string');

	const fontSize = opts.fontSize;
	const fontScale = 1 / opts.font.unitsPerEm * fontSize;

	const glyph = opts.font.charToGlyph(ch);
	const width = glyph.advanceWidth ? glyph.advanceWidth * fontScale : 0;
	const left = opts.x - (width / 2);

	const height = (opts.ascender + opts.descender) * fontScale;
	const top = opts.y + (height / 2);
	const path = glyph.getPath(left, top, fontSize);

	const pathData = path.toPathData();

	return pathData;
};
