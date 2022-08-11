'use strict';
const path = require('path');
const opentype = require('opentype.js');
const charPreset = require('./char-preset');

const fontPath = path.join(__dirname, "../fonts/Comismsh.ttf");

const options = () => {
	const font = opentype.loadSync(fontPath);
	const ascender = font.ascender;
	const descender = font.descender;
	return {
		width: 150,
		height: 50,
		noise: 1,
		color: false,
		background: '',
		size: 4,
		ignoreChars: '',
		fontSize: 56,
		charPreset, font, ascender, descender
	}
};

const loadFont = filepath => {
	fontPath = filepath;
};

module.exports = {
	options, loadFont
};
