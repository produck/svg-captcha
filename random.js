'use strict';

const presets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const randomInt = function (min, max) {
	return Math.round(min + Math.random() * (max - min));
};

exports.int = randomInt;

exports.greyColor = function () {
	const int = randomInt(2, 9).toString(16);

	return '#' + int + int + int;
};

exports.captchaText = function (size) {
	size = size || 4;
	var i = -1;
	var out = '';

	while (++i < size) {
		out += presets[randomInt(0, 61)]
	}

	return out;
};
