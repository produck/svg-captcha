'use strict';

const textToSVG = require('text-to-svg').loadSync();
const random = require('./random');

const generateBackground = function (width, height) {
	const seed = random.int(0, 1010101010);

	return `<filter id="n" x="0" y="0">
		<feTurbulence baseFrequency=".7,.07" seed="${seed}"/>
			<feColorMatrix type="luminanceToAlpha"/>
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
		x: 0, y: height / 2, fontSize: Math.floor(height * 0.72),
		anchor: 'left middle',
		attributes: {fill: 'red', stroke: 'black'}
	};
};

const getText = function (text, width, height) {
	const toSVGOptions = getSVGOptions(width, height);
	const len = text.length;
	const spacing = (width - 10) / (len + 1);
	var i = -1;
	var out = [];
	
	while (++i < len) {
		var charPath = textToSVG.getD(text[i], toSVGOptions);
		// randomly scale it to 95% - 105%, skew
		var randomScale = random.int(95, 105) / 100;
		var randomTranslateX = (i + 1) * spacing + random.int(-2, 2);
		var randomTranslateY = random.int(-3, 3);
		var color = random.greyColor(0, 4);
		var randomSkewX = random.int(-7, 7);
		out.push(`<path fill="${color}" d="${charPath}"
			transform="scale(${randomScale})
			translate(${randomTranslateX},${randomTranslateY})
			skewX(${randomSkewX})"/>`);
	}

	return out.join('');
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
	const textPath = getText(text, width, height);
	const xml = `<svg xmlns="http://www.w3.org/2000/svg"
		width="${width}" height="${height}">
			${textPath}
			${lineNoise}
			${bg}
		</svg>`;

	return xml.replace('\t', '');
};

module.exports = createCaptcha;
module.exports.randomText = random.captchaText;
