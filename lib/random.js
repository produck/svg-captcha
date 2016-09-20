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
