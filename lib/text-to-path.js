const path = require('path');
const opentype = require('opentype.js');

const fontPath = path.join(__dirname, '../fonts/Comismsh.ttf');
const font = opentype.loadSync(fontPath);

var getWidth = function getWidth(text, fontScale) {
	var width = 0;
	var glyph;

	const glyphs = font.stringToGlyphs(text);

	for (var i = 0; i < glyphs.length; i++) {
		glyph = glyphs[i];

		if (glyph.advanceWidth) {
			width += glyph.advanceWidth * fontScale;
		}

		if (i < glyphs.length - 1) {
			width += font.getKerningValue(glyph, glyphs[i + 1]) * fontScale;
		}
	}

	return width;
};

var getHeight = function getHeight(fontScale) {
	return (font.ascender + font.descender) * fontScale;
};

module.exports = function getPath(text, options) {
	options = options === undefined ? {} : options;
	const fontSize = options.fontSize || 72;
	const fontScale = 1 / font.unitsPerEm * fontSize;

	const width = getWidth(text, fontScale);
	const left = (options.x || 0) - (width / 2);

	const height = getHeight(fontScale);
	const baseline = (options.y || 0) + (height / 2);
	const path = font.getPath(text, left, baseline, fontSize, {kerning: true});

	return path.toPathData();
};
