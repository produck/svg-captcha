function Xmlns() {
	return 'xmlns=http://www.w3.org/2000/svg';
}

function Width(value) {
	return `width="${value}"`;
}

function Height(value) {
	return `height="${value}"`;
}

function Viewbox(minX = 0, minY = 0, width, height) {
	return `viewbox="${minX} ${minY} ${width} ${height}"`;
}

module.exports = function SvgXmlFactory({
	width, height, sectionList
} = {}) {
	const attributes = [
		Xmlns(),
		Width(width),
		Height(height),
		Viewbox(0, 0, width, height)
	];

	return `<svg ${attributes.join(' ')}>${sectionList.join('')}</svg>`;
};