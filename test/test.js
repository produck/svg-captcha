'use strict';

const assert = require('assert');
const mochaSugar = require('mocha-sugar-free');
const svgCaptcha = require('../');

const describe = mochaSugar.describe;
const it = mochaSugar.it;

const xmlReg = /^<svg[\s\S]+\/svg>$/;
const textTagReg = /text/;

describe('svg captcha', function () {
	it('should generate random text', function () {
		for (let i = 0; i < 62; i++) {
			let text = svgCaptcha.randomText();
			assert(/^[0-9a-zA-Z]+$/.test(text));
		}
	});

	it('should generate svg', function () {
		assert(xmlReg.test(svgCaptcha()));
		assert(xmlReg.test(svgCaptcha({text: 'abcd'})));
	});

	it('should generate path', function () {
		assert(!textTagReg.test(svgCaptcha({text: 'text'})));
	});

	it('should be fast', function () {
		for (let i = 0; i < 100; i++) {
			let text = svgCaptcha.randomText();
			svgCaptcha(text);
		}
	}, {
		slow: 50,
		timeout: 100
	});
});

const random = require('../lib/random');

describe('random function', function () {
	it('should generate random integer', function () {
		for (var i = 0; i < 10; i++) {
			var num = random.int(0, 10);
			assert(num >= 0 && num <= 10);
		}
	});

	it('should generate grey color', function () {
		assert(random.greyColor());
		assert(random.greyColor(3, 4));
	});
});
