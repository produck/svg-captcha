'use strict';
const path = require('path');
const opentype = require('opentype.js');
const chToPath = require('./ch-to-path');
const random = require('./random');

const fontPath = path.join(__dirname, '../fonts/Comismsh.ttf');
let font = opentype.loadSync(fontPath);

function loadFont(filepath) {
	font = opentype.loadSync(filepath);
}

function getLineNoise(width, height, noise, background) {
	const noiseLines = [];
	let i = -1;
	while (++i < noise) {
		const start = `${random.int(1, 21)} ${random.int(1, height - 1)}`;
		const end = `${random.int(width - 21, width - 1)} ${random.int(1, height - 1)}`;
		const mid1 = `${random.int((width / 2) - 21, (width / 2) + 21)} ${random.int(1, height - 1)}`;
		const mid2 = `${random.int((width / 2) - 21, (width / 2) + 21)} ${random.int(1, height - 1)}`;
		const color = random.invertColor(background);
		noiseLines.push(`<path d="M${start} C${mid1},${mid2},${end}" stroke="${color}" fill="none"/>`);
	}

	return noiseLines;
};

const getText = function (text, options) {
	const len = text.length;
	const spacing = (options.width - 2) / (len + 1);
	let i = -1;
	const out = [];

	while (++i < len) {
		const x = spacing * (i + 1);
		const y = options.height / 2;
		const charPath = chToPath(text[i], x, y, options.fontSize, font);

		const color = options.color || random.invertColor(options.background);
		out.push(`<path fill="${color}" d="${charPath}"/>`);
	}

	return out;
};

const createCaptcha = function (text, options) {
	const bgRect = options.background ?
		`<rect width="100%" height="100%" fill="${options.background}"/>` : '';
	const paths = []
		.concat(getLineNoise(options.width, options.height, options.noise, options.background))
		.concat(getText(text, options))
		.join('');
	const start = `<svg xmlns="http://www.w3.org/2000/svg" width="${options.width}" height="${options.height}" viewBox="0,0,${options.width},${options.height}">`;
	const xml = `${start}${bgRect}${paths}</svg>`;

	return xml;
};

const defaultOption = {
	cookie: 'captcha',
	background: 'rgb(255,200,150)',
	fontSize: 60,
	width: 250,
	height: 150,
	charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
	size: 5,
	noise: 1
};

function getOption(userOptions) {
	userOptions = userOptions || {};

	return Object.assign({}, defaultOption, userOptions);
}

function create(options) {
	const userOptions = getOption(options);
	const text = random.captchaText(userOptions);
	const data = createCaptcha(text, userOptions);

	return {
		text,
		data
	};
}

const createMathExpr = function (options) {
	const userOptions = getOption(options);
	const expr = random.mathExpr();
	const text = expr.text;
	const data = createCaptcha(expr.equation, userOptions);

	return {
		text,
		data
	};
}

exports.create = create;
exports.createMathExpr = createMathExpr;
exports.loadFont = loadFont;
