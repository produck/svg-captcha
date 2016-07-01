'use strict';

const textToPath = require('./text-to-path');
const random = require('./random');

const generateBackground = function (width, height) {
	const seed = random.int(0, 10);

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
		var mid1 = random.int((width / 2) - 25, (width / 2) + 25) + ' ' +
			random.int(10, height - 10);
		var mid2 = random.int((width / 2) - 25, (width / 2) + 25) + ' ' +
			random.int(10, height - 10);
		var color = random.greyColor();
		noiseString.push(`<path d="M${start} C${mid1},${mid2},${end}"
			stroke="${color}" fill="transparent"/>`);
	}

	return noiseString.join('');
};

const getSVGOptions = function (x, height) {
	return {
		x: x, y: height / 2, fontSize: Math.floor(height * 0.98)
	};
};

const getText = function (text, width, height, options) {
	const len = text.length;
	const spacing = (width - 2) / (len + 1);
	var i = -1;
	var out = [];

	while (++i < len) {
		var charPath = textToPath(text[i],
			getSVGOptions((i + 1) * spacing, height));
		// randomly scale it to 95% - 105%, skew
		var transform = options.transform ?
			`transform="matrix(${random.matrix()})"` : '';
		var color = random.greyColor(0, 4);
		out.push(`<path fill="${color}" d="${charPath}"
			${transform}/>`);
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
	const noiseLv = options.noise || 1;
	const text = options.text || random.captchaText();

	const lineNoise = getLineNoise(noiseLv, width, height);
	const bg = options.bg ? generateBackground(width, height) : '';
	const textPath = getText(text, width, height, options);
	const xml = `<svg xmlns="http://www.w3.org/2000/svg"
		width="${width}" height="${height}">
			${textPath}
			${lineNoise}
			${bg}
		</svg>`;

	return xml.replace(/[\t]/g, '').replace(/\n(\W)/g, '$1');
};

module.exports = createCaptcha;
module.exports.randomText = random.captchaText;
