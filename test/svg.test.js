'use strict';
const svgCaptcha = require('../');

test('Generate random test', () => {
	for (let i = 0; i < 100; i++) {
		const text = svgCaptcha.randomText();
		expect(text).toMatch(/^[0-9a-zA-Z]+$/);
	}
});

test('Filter chars', () => {
	const opt = {ignoreChars: '0123456789'};
	for (let i = 0; i < 100; i++) {
		const text = svgCaptcha.randomText(opt);
		expect(text).toMatch(/^[a-zA-Z]+$/);
	}
});

const xmlReg = /^<svg[\s\S]+\/svg>$/;
test('Old svgCaptcha() api', () => {
	expect(svgCaptcha()).toMatch(xmlReg);
	expect(svgCaptcha('abcd')).toMatch(xmlReg);
});

test('Current create() api', () => {
	const c = svgCaptcha.create();
	expect(c.data).toMatch(xmlReg);
	expect(c.text.length).toEqual(4);
});

test('Global charPreset options', () => {
	const defaultPreset = svgCaptcha.options.charPreset;
	svgCaptcha.options.charPreset = '0123456789';
	for (let i = 0; i < 100; i++) {
		const text = svgCaptcha.randomText();
		expect(text).toMatch(/^[0-9]+$/);
	}
	svgCaptcha.options.charPreset = defaultPreset;
});

test('Local charPreset options', () => {
	const opt = {charPreset: '0123456789'};
	for (let i = 0; i < 100; i++) {
		const text = svgCaptcha.randomText(opt);
		expect(text).toMatch(/^[0-9]+$/);
	}
});
