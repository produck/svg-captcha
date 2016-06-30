const assert = require('assert');
const svgCaptcha = require('../');

const xmlReg = /^<svg[\s\S]+\/svg>$/;

describe('svg captcha', function () {
	it('should generate random text', function () {
		for (var i = 0; i < 62; i++) {
			var text = svgCaptcha.randomText();
			assert(/^[0-9a-zA-Z]+$/.test(text));
		}
	});

	it('should generate svg', function () {
		assert(xmlReg.test(svgCaptcha()));
		assert(xmlReg.test(svgCaptcha({text: 'abcd'})));
	});
});

const random = require('../random');

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
