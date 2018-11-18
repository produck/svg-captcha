function getCharPath(char, font, offsetX, offsetY, fontSize) {
	const glyph = font.charToGlyph(char);
	return glyph.getPath(offsetX, offsetY, fontSize);
}

function getCharSVGFromPathData(pathData, color) {
	return `<path fill="${color}" d="${pathData}" />`;
}

function getCharSVG(char, index, options) {
	const { x, y } = options.svg.getCharOffset(index);
	const font = options.font.registry.pick();
	const fontSize = options.font.getSize();

	const path = getCharPath(char, font, x, y, fontSize);

	options.svg.pathModifier(path);

	return getCharSVGFromPathData(path.toPathData(), options.font.colorPicker());
}

module.exports = function draw(text, options) {
	const textSVG = Array.from(text)
		.map((char, index) => getCharSVG(char, index, options));

	const backgroundRect = '';

	//TODO 
};