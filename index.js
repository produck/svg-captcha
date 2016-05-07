'use strict';

const textToSVG = require('text-to-svg').loadSync();
const random = require('./random');

const generateBackground = function (width, height) {
	const f = random.int(40, 55);

	return `<filter id="n" x="0" y="0">
		<feTurbulence
			type="fractalNoise"
			baseFrequency="0.${f}"
			numOctaves="15"
			stitchTiles="stitch"/>
		</filter>
		<rect width="${width}" height="${height}" filter="url(#n)" opacity="0.2"/>`;
};

const getLineNoise = function (lv, width, height) {
	const noiseString = [];
	var i = -1;

	while (++i < lv) {
		var start = random.int(5, 25) + ' ' + 
			random.int(10, height - 10);
		var end = random.int(width - 25, width - 5) + ' ' + 
			random.int(10, height - 10);
		var mid1 = random.int(width / 2 - 25, width / 2 + 25) + ' ' + 
			random.int(10, height - 10);
		var mid2 = random.int(width / 2 - 25, width / 2 + 25) + ' ' + 
			random.int(10, height - 10);
		var color = random.greyColor();
		noiseString.push(`<path d="M${start} C${mid1},${mid2},${end}"
			stroke="${color}" fill="transparent"/>`);
	}

	return noiseString.join('');
};

const getSVGOptions = function (width, height) {
	return {
		x: width / 2, y: height / 2, fontSize: Math.floor(height * 0.72),
		anchor: 'center middle',
		attributes: {fill: 'red', stroke: 'black'}
	};
};

const createCaptcha = function (options) {
	if (typeof options === 'string') {
		options = {text: options};
	}
	options = options || {};
	const width = options.width || 150;
	const height = options.height || 50;
	const noiseLv = options.noise || 3;
	const text = options.text || random.captchaText();

	const lineNoise = getLineNoise(noiseLv, width, height);
	const bg = generateBackground(width, height);
	const toSVGOptions = getSVGOptions(width, height);
	const textPath = textToSVG.getD(text, toSVGOptions);
	const xml = `<svg xmlns="http://www.w3.org/2000/svg"
		width="${width}" height="${height}">
			<path fill="black" d="${textPath}" />
			${lineNoise}
			${bg}
		</svg>`;

	return xml;
};

module.exports = createCaptcha;
module.exports.randomText = random.captchaText;
