'use strict';

const chToPath = require('./ch-to-path');
const random = require('./random');

const getLineNoise = function (lv, width, height, hasColor) {
	const noiseString = [];
	let i = -1;

	while (++i < lv) {
		const start = `${random.int(5, 25)} ${random.int(10, height - 10)}`;
		const end = `${random.int(width - 25, width - 5)} ${random.int(10, height - 10)}`;
		const mid1 = `${random.int((width / 2) - 25, (width / 2) + 25)} ${random.int(10, height - 10)}`;
		const mid2 = `${random.int((width / 2) - 25, (width / 2) + 25)} ${random.int(10, height - 10)}`;
		const color = hasColor ? random.color() : random.greyColor();
		noiseString.push(`<path d="M${start} C${mid1},${mid2},${end}"
			stroke="${color}" fill="transparent"/>`);
	}

	return noiseString.join('');
};

const getSVGOptions = function (x, height) {
	return {
		x: x, y: height / 2,
		fontSize: height
	};
};

const getText = function (text, width, height, hasColor) {
	const len = text.length;
	const spacing = (width - 2) / (len + 1);
	let i = -1;
	const out = [];

	while (++i < len) {
		const charPath = chToPath(
			text[i],
			getSVGOptions(spacing * (i + 1), height)
		);

		const color = hasColor ?
			random.color() : random.greyColor(0, 4);
		out.push(`<path fill="${color}" d="${charPath}"/>`);
	}

	return out.join('');
};

const createCaptcha = function (text, options) {
	options = options || {};
	const width = options.width || 150;
	const height = options.height || 50;
	const noiseLv = options.noise || 1;
	const hasColor = Boolean(options.color);
	const background =
		options.background || options.backgroundColor;
	text = text || random.captchaText();

	const bgRect = background ?
		`<rect width="100%" height="100%" fill="${background}"/>` : '';
	const lineNoise = getLineNoise(noiseLv, width, height, hasColor);
	const textPath = getText(text, width, height, hasColor);
	const xml = `<svg xmlns="http://www.w3.org/2000/svg"
		width="${width}" height="${height}">
			${bgRect}
			${textPath}
			${lineNoise}
		</svg>`;

	return xml.replace(/[\t]/g, '').replace(/\n(\W)/g, '$1');
};

const create = function (options) {
	const text = random.captchaText(options);
	const data = createCaptcha(text, options);

	return {text, data};
};

module.exports = createCaptcha;
module.exports.randomText = random.captchaText;
module.exports.create = create;
