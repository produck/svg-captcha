const svgCaptcha = require('../');

console.time('generate 100 images');
for (var i = 0; i < 100; i++) {
	var text = svgCaptcha.randomText();
	svgCaptcha(text);
}
console.timeEnd('generate 100 images');
