'use strict';

const assert = require('assert');
const svgCaptcha = require('../');

const xmlReg = /^<svg[\s\S]+\/svg>$/;
const textTagReg = /text/;

describe('svg captcha', () => {
	it('should generate random text', () => {
		for (let i = 0; i < 62; i++) {
			const text = svgCaptcha.randomText();
			assert(/^[0-9a-zA-Z]+$/.test(text));
		}
	});

	it('should filter unwanted chars', () => {
		const opt = {ignoreChars: '0123456789'};
		for (let i = 0; i < 62; i++) {
			const text = svgCaptcha.randomText(opt);
			assert(/^[a-zA-Z]+$/.test(text));
		}
	});

	it('should generate svg', () => {
		assert(xmlReg.test(svgCaptcha()));
		assert(xmlReg.test(svgCaptcha('abcd')));
	});

	it('should generate path', () => {
		assert(!textTagReg.test(svgCaptcha('text')));
	});

	it('should be fast', () => {
		for (let i = 0; i < 100; i++) {
			svgCaptcha.create();
		}
	}, {
		slow: 50,
		timeout: 100
	});

	it('should return a object with create api', () => {
		const c = svgCaptcha.create();
		assert(xmlReg.test(c.data));
		assert.equal(c.text.length, 4);
	});
});

const random = require('../lib/random');

describe('random function', () => {
	it('should generate random integer', () => {
		for (let i = 0; i < 10; i++) {
			const num = random.int(0, 10);
			assert(num >= 0 && num <= 10);
		}
	});

	it('should generate grey color', () => {
		assert(random.greyColor());
		assert(random.greyColor(3, 4));
	});

	it('should generate color', () => {
		assert(random.color(4, 0));
		assert(random.color(4, 1));
	});
});
