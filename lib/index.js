'use strict';
const chToPath = require('./ch-to-path');
const random = require('./random');

const getLineNoise = function (width, height, options) {
	const hasColor = options.color;
	const noiseString = [];
	let i = -1;

	while (++i < options.noise) {
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

const getText = function (text, width, height, options) {
	const len = text.length;
	const spacing = (width - 2) / (len + 1);
	let i = -1;
	const out = [];

	while (++i < len) {
		const x = spacing * (i + 1);
		const y = height / 2;
		const fontSize = height;
		const charPath = chToPath(
			text[i],
			Object.assign({x, y, fontSize}, options)
		);

		const color = options.color ?
			random.color(options.background) : random.greyColor(0, 4);
		out.push(`<path fill="${color}" d="${charPath}"/>`);
	}

	return out.join('');
};

const defaultOption = {
	width: 150,
	height: 50,
	noise: 1,
	color: false,
	background: ''
};
const createCaptcha = function (text, options) {
	text = text || random.captchaText();
	options = Object.assign({}, defaultOption, options);
	const width = options.width;
	const height = options.height;
	const bg = options.background;
	if (bg) {
		options.color = true;
	}

	const bgRect = bg ?
		`<rect width="100%" height="100%" fill="${bg}"/>` : '';
	const lineNoise = getLineNoise(width, height, options);
	const textPath = getText(text, width, height, options);
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
