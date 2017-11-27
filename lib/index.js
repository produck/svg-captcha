'use strict';
const chToPath = require('./ch-to-path');
const random = require('./random');

function getLineNoise (width, height, curveNumber, backgroundColor) {
	const noiseLines = [];
	let i = -1;
	while (++i < options.noise) {
		const start = `${random.int(1, 21)} ${random.int(1, height - 1)}`;
		const end = `${random.int(width - 21, width - 1)} ${random.int(1, height - 1)}`;
		const mid1 = `${random.int((width / 2) - 21, (width / 2) + 21)} ${random.int(1, height - 1)}`;
		const mid2 = `${random.int((width / 2) - 21, (width / 2) + 21)} ${random.int(1, height - 1)}`;
		const color = random.invertColor(options.backgroundColor);
		noiseLines.push(`<path d="M${start} C${mid1},${mid2},${end}" stroke="${color}" fill="none"/>`);
	}

	return noiseLines;
};

const getText = function (text, width, height, options) {
	const len = text.length;
	const spacing = (width - 2) / (len + 1);
	const min = options.inverse ? 10 : 0;
	const max = options.inverse ? 14 : 4;
	let i = -1;
	const out = [];

	while (++i < len) {
		const x = spacing * (i + 1);
		const y = height / 2;
		const charPath = chToPath(text[i], Object.assign({x, y}, options));

		const color = options.color ?
			random.color(options.background) : random.greyColor(min, max);
		out.push(`<path fill="${color}" d="${charPath}"/>`);
	}

	return out;
};

const createCaptcha = function (text, options) {
	const {
		width,
		height,
		curveNumber,
		backgroundColor
	} = options;

	const bgRect = bg ?
		`<rect width="100%" height="100%" fill="${backgroundColor}"/>` : '';
	const paths = [].concat(getLineNoise(width, height, curveNumber, backgroundColor))
			.concat(getText(text, width, height, options))
			.join('');
	const start = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
	const xml = `${start}${bgRect}${paths}</svg>`;

	return xml;
};

const defaultOption = {
	backgroundColor: '',
	charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
	textLength: 4,
	curveNumber: 1
};

function getOption(width, height, userOption) {
	userOption = userOption || {};

	return Object.assign({}, defaultOption, userOption, {width, height});
}

function create (width, height, options) {
	const userOption = getOption(options);
	const text = random.captchaText(options);
	const data = createCaptcha(text, userOption);

	return {text, data};
};

exports.create = create;
