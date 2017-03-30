'use strict';
const assert = require('assert');

module.exports = function (text, opts) {
	const ch = text[0];
	assert(ch, 'expect a string');

	const fontSize = opts.fontSize;
	const fontScale = fontSize / opts.font.unitsPerEm;

	const glyph = opts.font.charToGlyph(ch);
	const width = glyph.advanceWidth ? glyph.advanceWidth * fontScale : 0;
	const left = opts.x - (width / 2);

	const top = opts.y - opts.descender * fontScale;
	const path = glyph.getPath(left, top, fontSize);

	const pathData = path.toPathData();

	return pathData;
};
