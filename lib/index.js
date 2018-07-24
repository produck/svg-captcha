'use strict';

const Captcha = require('./captcha');

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

const captcha = function (config) {
    return new Captcha(getOption(config)).create();
};

captcha.create = function (config, generator, validator) {

    return new Captcha(getOption(config), generator, validator);
};

module.exports = captcha;