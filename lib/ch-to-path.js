const assert = require('assert');
const path = require('path');
const opentype = require('opentype.js');

const fontPath = path.join(__dirname, '../fonts/Comismsh.ttf');
const font = opentype.loadSync(fontPath);

const pathStore = {};

const getWidth = function getWidth(ch, fontScale) {
	const glyph = font.stringToGlyphs(ch)[0];

	return glyph.advanceWidth ? glyph.advanceWidth * fontScale : 0;
};

const getHeight = function getHeight(fontScale) {
	return (font.ascender + font.descender) * fontScale;
};

module.exports = function getPath(text, options) {
	const ch = text.trim()[0];
	assert(ch, 'expect a string');

	if (pathStore[ch]) {
		return pathStore[ch];
	}

	options = options === undefined ? {} : options;
	const fontSize = options.fontSize || 72;
	const fontScale = 1 / font.unitsPerEm * fontSize;

	const width = getWidth(ch, fontScale);
	const left = 0 - (width / 2);

	const height = getHeight(fontScale);
	const baseline = (options.y || 0) + (height / 2);
	const path = font.getPath(ch, left, baseline, fontSize, {kerning: true});
	// caching character path for optimization
	// since the glyph generation is deoptimized
	const pathData = path.toPathData();
	pathStore[ch] = pathData;

	return pathData;
};
