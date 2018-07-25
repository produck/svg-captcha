'use strict';

const path = require('path');
const opentype = require('opentype.js');
const chToPath = require('./ch-to-path');
const RandEXp = require('randexp');
const random = require('./random');

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

const getText = function (text, font, width, height, options) {
	const len = text.length;
	const spacing = (width - 2) / (len + 1);
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

module.exports = class Captcha {
    constructor (config) {
        this.config = config;

        this._font = opentype.loadSync(path.join(__dirname, '../fonts/Comismsh.ttf'));
    }

    changeFont(filepath) {
        this._font = opentype.loadSync(filepath);
	}

	captchaText(options) {
		const size = options.size;
		const chars = options.charPreset;
		
		return new RandEXp(`[${chars}]{${size}}`).gen();
	}

	captchaData(text, font, options) {
		const width = options.width;
		const height = options.height;
		const noise = options.noise;
		const background = options.background;

		const bgRect = background ?
			`<rect width="100%" height="100%" fill="${background}"/>` : '';
		const paths = [].concat(getLineNoise(width, height, noise, background))
				.concat(getText(text, font, width, height, options))
				.join('');
		const start = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
		const xml = `${start}${bgRect}${paths}</svg>`;

		return xml;
	}
	
	generate() {
		this.text = this.captchaText(this.config);
        this.data = this.captchaData(this.text, this._font, this.config);	
	}

	validate() {

	}
};