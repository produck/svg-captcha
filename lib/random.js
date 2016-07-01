'use strict';

const presets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const randomInt = function (min, max) {
	return Math.round(min + (Math.random() * (max - min)));
};

exports.int = randomInt;

exports.greyColor = function (min, max) {
	min = min || 1;
	max = max || 9;
	const int = randomInt(min, max).toString(16);

	return '#' + int + int + int;
};

// https://developer.mozilla.org/en/docs/Web/SVG/Attribute/transform
exports.matrix = function () {
	var scale = randomInt(95, 105) / 100;
	var dx = randomInt(-2, 2);
	var dy = randomInt(-3, 3);
	// - 15 to 15 deg
	var skewX = randomInt(-267, 267) / 1000;

	return `${scale} 0 ${skewX} ${scale} ${dx} ${dy}`;
};

exports.captchaText = function (size) {
	size = size || 4;
	var i = -1;
	var out = '';

	while (++i < size) {
		out += presets[randomInt(0, 61)];
	}

	return out;
};
