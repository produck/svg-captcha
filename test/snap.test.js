'use strict';
const svgCaptcha = require('../');
// Quick seeded random
let seed = 10;
Math.random = jest.fn(() => {
	seed = ((seed * 9301) + 49297) % 233280;
	return seed / 233280;
});

test('Renders SVG', () => {
	const c = svgCaptcha.create();
	expect(c.data).toMatchSnapshot();
});

test('Renders math Expression', () => {
	const c = svgCaptcha.createMathExpr({color: true});
	expect(c.data).toMatchSnapshot();
});

test('Renders SVG on dark background', () => {
	const c = svgCaptcha.create({inverse: true});
	expect(c.data).toMatchSnapshot();
});

test('Renders on small canvas', () => {
	const c = svgCaptcha.create({width: 40, height: 18, fontSize: 24});
	expect(c.data).toMatchSnapshot();
});
