const opentype = require('opentype.js');

const utils = require('./utils');

function DEFAULT_FONT_PICKER(fontRegistry) {
	const length = fontRegistry.length;

	return fontRegistry[utils.randomIntegerByRange(0, length)];
}

function DEFAULT_COMMAND_MODIFIER(command) {
	return command;
}

exports.drawChar = function draw(
	char,
	registry,
	// fontPicker = DEFAULT_FONT_PICKER,
	fontSize = 75,
	modifier = DEFAULT_COMMAND_MODIFIER
) {
	const font = DEFAULT_FONT_PICKER(registry);
	const glyph = font.charToGlyph(char);
	const path = glyph.getPath(0, 0, fontSize);

	path.commands.forEach(modifier);

	return path.toPathData();
};