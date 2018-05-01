'use strict';
const path = require('path');
const opentype = require('opentype.js');
const charPreset = require('./char-preset');
const chToPath = require('./ch-to-path');
const random = require('./random');

// static font initialization fails webpack builds
// delaying font initialization will allow applications to configure font in advance
// const fontPath = path.join(__dirname, '../fonts/Comismsh.ttf');
// let font = opentype.loadSync(fontPath);
let font = null;

function loadFont(filepath) {
	// load / reload font
	if (filepath != null) {
		font = opentype.loadSync(filepath);
	}

	// default unconfigured behaviour
	if (font == null && filepath == null) {
		font = opentype.loadSync(path.join(__dirname, '../fonts/Comismsh.ttf'))
	}
}

function getLineNoise (width, height, noise, background) {
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

const getText = function (text, width, height, options) {
	// make sure that some font is loaded
	loadFont(null);
	
	const len = text.length;
	const spacing = (width - 2) / (len + 1);
	const min = options.inverse ? 10 : 0;
	const max = options.inverse ? 14 : 4;
	let i = -1;
	const out = [];

	while (++i < len) {
		const x = spacing * (i + 1);
		const y = height / 2;
		const charPath = chToPath(text[i], x, y, 50 , font);

		const color = random.invertColor(options.background);
		out.push(`<path fill="${color}" d="${charPath}"/>`);
	}

	return out;
};

const createCaptcha = function (text, options) {
	const width = options.width;
	const height = options.height;
	const noise = options.noise;
	const background = options.background;

	const bgRect = background ?
		`<rect width="100%" height="100%" fill="${background}"/>` : '';
	const paths = [].concat(getLineNoise(width, height, noise, background))
			.concat(getText(text, width, height, options))
			.join('');
	const start = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
	const xml = `${start}${bgRect}${paths}</svg>`;

	return xml;
};

const defaultOption = {
	background: '',
	charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
	size: 4,
	noise: 1
};

function getOption(width, height, userOption) {
	userOption = userOption || {};

	return Object.assign({}, defaultOption, userOption, {width, height});
}

function create (width, height, options) {
	const userOption = getOption(options);
	const text = random.captchaText(userOption);
	const data = createCaptcha(text, userOption);

	return {text, data};
};

exports.create = create;
exports.loadFont = loadFont;
