'use strict';
const svgCaptcha = require('../lib/captcha');

test('Current create() api', () => {
	const xmlReg = /^<svg[\s\S]+\/svg>$/;
	const c = svgCaptcha.create();
	expect(c.data).toMatch(xmlReg);
	expect(c.text.length).toEqual(5);
});
