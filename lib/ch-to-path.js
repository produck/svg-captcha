'use strict';
const assert = require('assert');

function rndPathCmd(cmd) {
	const r = (Math.random() * 0.2) - 0.1;

	switch (cmd.type) {
		case 'M': case 'L':
			cmd.x += r;
			cmd.y += r;
			break;
		case 'Q': case 'C':
			cmd.x += r;
			cmd.y += r;
			cmd.x1 += r;
			cmd.y1 += r;
			break;
		default:
			// Close path cmd
			break;
	}

	return cmd;
}

module.exports = function (text, opts) {
	const ch = text[0];
	assert(ch, 'expect a string');

	const fontSize = opts.fontSize;
	const fontScale = fontSize / opts.font.unitsPerEm;

	const glyph = opts.font.charToGlyph(ch);
	const width = glyph.advanceWidth ? glyph.advanceWidth * fontScale : 0;
	const left = opts.x - (width / 2);

	const height = (opts.ascender + opts.descender) * fontScale;
	const top = opts.y + (height / 2);
	const path = glyph.getPath(left, top, fontSize);
	// Randomize path commands
	path.commands.forEach(rndPathCmd);

	const pathData = path.toPathData();

	return pathData;
};
