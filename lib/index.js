'use strict';

const chToPath = require('./ch-to-path');
const random = require('./random');

const getLineNoise = function (lv, width, height) {
	const noiseString = [];
	let i = -1;

	while (++i < lv) {
		let start = random.int(5, 25) + ' ' +
			random.int(10, height - 10);
		let end = random.int(width - 25, width - 5) + ' ' +
			random.int(10, height - 10);
		let mid1 = random.int((width / 2) - 25, (width / 2) + 25) + ' ' +
			random.int(10, height - 10);
		let mid2 = random.int((width / 2) - 25, (width / 2) + 25) + ' ' +
			random.int(10, height - 10);
		let color = random.greyColor();
		noiseString.push(`<path d="M${start} C${mid1},${mid2},${end}"
			stroke="${color}" fill="transparent"/>`);
	}

	return noiseString.join('');
};

const getSVGOptions = function (height) {
	return {
		y: height / 2, fontSize: height
	};
};

const getText = function (text, width, height) {
	const len = text.length;
	const spacing = (width - 2) / (len + 1);
	let i = -1;
	let out = [];

	while (++i < len) {
		let charPath = chToPath(text[i], getSVGOptions(height));
		// randomly and evenly space out the characters
		let spacePos = spacing * (i + 1);
		let transform = random.int(spacePos - 2, spacePos + 4);
		let color = random.greyColor(0, 4);
		out.push(`<path fill="${color}" d="${charPath}"
			transform="translate(${transform})"/>`);
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
	const textPath = getText(text, width, height, options);
	const xml = `<svg xmlns="http://www.w3.org/2000/svg"
		width="${width}" height="${height}">
			${textPath}
			${lineNoise}
		</svg>`;

	return xml.replace(/[\t]/g, '').replace(/\n(\W)/g, '$1');
};

module.exports = createCaptcha;
module.exports.randomText = random.captchaText;
