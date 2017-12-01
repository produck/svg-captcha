'use strict';

const randomInt = function (min, max) {
	return Math.round(min + (Math.random() * (max - min)));
};

exports.int = randomInt;

exports.captchaText = function (options) {
	const size = options.size;
	const chars = options.charPreset;
	let i = -1;
	let out = '';
	const len = chars.length - 1;

	while (++i < size) {
		out += chars[randomInt(0, len)];
	}

	return out;
};

/**
 * Returns an object that has the following props:
 * text, equation
 */
exports.mathExpr = function () {
	const left = randomInt(1, 9);
	const right = randomInt(1, 9);
	const text = (left + right).toString();
	const equation = left + '+' + right;

	return {text, equation};
};

/**
 * @param {string} bgColor background color in hex
 */
exports.invertColor = function (bgColor) {
	const hue = randomInt(0, 360) / 360;

	const saturation = randomInt(60, 80) / 100;
	const baseLightness = bgColor ? getLightness(bgColor) : 1.0;
	let lightness;
	if (baseLightness >= 0.5) {
		lightness = baseLightness - 0.3 - Math.random() * 0.2;
	} else {
		lightness = baseLightness + 0.3 + Math.random() * 0.2;
	}
	// hsl to rgb conversion
	// https://gist.github.com/mjackson/5311256
	const q = lightness < 0.5 ?
		lightness * (lightness + saturation) :
		lightness + saturation - (lightness * saturation);
	const p = (2 * lightness) - q;

	const r = Math.floor(hue2rgb(p, q, hue + (1 / 3)) * 255);
	const g = Math.floor(hue2rgb(p, q, hue) * 255);
	const b = Math.floor(hue2rgb(p, q, hue - (1 / 3)) * 255);
	/* eslint-disable no-mixed-operators */
	const c = ((b | g << 8 | r << 16) | 1 << 24).toString(16).slice(1);
	/* eslint-enable no-mixed-operators */
	return '#' + c;
};

function getLightness(rgbColor) {
	if (rgbColor[0] !== '#') {
		return 1.0; // Invalid color ?
	}
	rgbColor = rgbColor.slice(1);
	if (rgbColor.length === 3) {
		rgbColor = rgbColor[0] + rgbColor[0] +
			rgbColor[1] + rgbColor[1] + rgbColor[2] + rgbColor[2];
	}

	const hexColor = parseInt(rgbColor, 16);
	const r = hexColor >> 16;
	const g = (hexColor >> 8) & 255;
	const b = hexColor & 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	return (max + min) / (2 * 255);
}

function hue2rgb(p, q, h) {
	/* eslint-disable no-mixed-operators */
	h = (h + 1) % 1;
	if (h * 6 < 1) {
		return p + (q - p) * h * 6;
	}
	if (h * 2 < 1) {
		return q;
	}
	if (h * 3 < 2) {
		return p + (q - p) * ((2 / 3) - h) * 6;
	}
	/* eslint-enable no-mixed-operators */
	return p;
}
