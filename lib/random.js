'use strict';

const presets = require('./char-preset');

const randomInt = function (min, max) {
	return Math.round(min + (Math.random() * (max - min)));
};

const stripCharsFromString = function (string, chars) {
	return string.split('').filter(char => chars.indexOf(char) === -1);
};

exports.int = randomInt;

exports.greyColor = function (min, max) {
	min = min || 1;
	max = max || 9;
	const int = randomInt(min, max).toString(16);

	return `#${int}${int}${int}`;
};

// https://developer.mozilla.org/en/docs/Web/SVG/Attribute/transform
exports.matrix = function () {
	const scale = randomInt(95, 105) / 100;
	const dx = randomInt(-2, 2);
	const dy = randomInt(-3, 3);
	// - 15 to 15 deg
	const skewX = randomInt(-267, 267) / 1000;

	return `${scale} 0 ${skewX} ${scale} ${dx} ${dy}`;
};

exports.captchaText = function (options) {
	if (typeof options === 'number') {
		options = {size: options};
	}
	options = options || {};

	const size = options.size || 4;
	const ignoreChars = options.ignoreChars || '';
	let i = -1;
	let out = '';
	let chars = presets;

	if (ignoreChars) {
		chars = stripCharsFromString(chars, ignoreChars);
	}

	const len = chars.length - 1;

	while (++i < size) {
		out += chars[randomInt(0, len)];
	}

	return out;
};

// https://github.com/jquery/jquery-color/blob/master/jquery.color.js#L432
// The idea here is generate color in hsl first and convert that to rgb color
exports.color = function () {
	// random 24 colors
	// or based on step
	const hue = randomInt(0, 24) / 24;

	const saturation = randomInt(60, 80) / 100;
	const lightness = randomInt(60, 80) / 100;

	const q = lightness < 0.5 ?
		lightness * (lightness + saturation) :
		lightness + saturation - (lightness * saturation);
	const p = (2 * lightness) - q;

	const r = Math.floor(hue2rgb(p, q, hue + (1 / 3)) * 255);
	const g = Math.floor(hue2rgb(p, q, hue) * 255);
	const b = Math.floor(hue2rgb(p, q, hue - (1 / 3)) * 255);
	/* eslint-disable no-mixed-operators */
	const c = ((b | g << 8 | r << 16) | 1 << 24).toString(16).slice(1);

	return '#' + c;
};

function hue2rgb(p, q, h) {
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
	return p;
}
