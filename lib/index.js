'use strict';

const defaultOption = {
	background: '',
	charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
	size: 4,
	noise: 1
};

function getOption(userOption) {
	userOption = userOption || {};

	return Object.assign({}, defaultOption, userOption);
}

const captcha = function (generator, validator) {
	const Captcha = require('./captcha');

    if (generator) {
		Captcha.prototype.generate = generator;
	}

	if (validator) {
		Captcha.prototype.validate = validator;
	}

	return Captcha;
};

captcha.create = function (config, generator, validator) {
	const Captcha = captcha(generator, validator);

	return new Captcha(getOption(config));
}

module.exports = captcha;