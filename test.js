const assert = require('assert');
const svgCaptcha = require('./');

for (var i = 0; i < 50; i++) {
	var text = svgCaptcha.randomText();
	assert(/^[0-9a-zA-Z]+$/.test(text));
}

const xmlReg = /^<svg[\s\S]+\/svg>$/;

assert(xmlReg.test(svgCaptcha()));
assert(xmlReg.test(svgCaptcha({text: 'abcd'})));
