const assert = require('assert');
const svgCaptcha = require('./');

console.time('generate 50 images');
for (var i = 0; i < 50; i++) {
	var text = svgCaptcha.randomText();
	assert(/^[0-9a-zA-Z]+$/.test(text));
	svgCaptcha(text);
}
console.timeEnd('generate 50 images');

const xmlReg = /^<svg[\s\S]+\/svg>$/;

assert(xmlReg.test(svgCaptcha()));
assert(xmlReg.test(svgCaptcha({text: 'abcd'})));
