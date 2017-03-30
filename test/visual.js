const fs = require('fs-extra');
const svg = require('../');

const TEST_DIR = 'svg-test';

fs.ensureDirSync(TEST_DIR);

for (let i = 0; i < 10; i++) {
	fs.writeFile(`${TEST_DIR}/${i}.svg`, svg(svg.randomText()), 'utf8', err => {
		if (err) {
			console.error(err);
		} else {
			console.log('it\'s saved');
		}
	});
}

for (let i = 0; i < 10; i++) {
	fs.writeFile(`${TEST_DIR}/1${i}.svg`, svg.createMathExpr({color: true}).data, 'utf8', err => {
		if (err) {
			console.error(err);
		} else {
			console.log('it\'s saved');
		}
	});
}

fs.writeFile(`${TEST_DIR}/20.svg`, svg.create({inverse: true}).data, 'utf8', err => {
	if (err) {
		console.error(err);
	} else {
		console.log('it\'s saved');
	}
});

fs.writeFile(
	`${TEST_DIR}/21.svg`,
	svg.create({width: 40, height: 18, fontSize: 24}).data,
	saveCb
);

function saveCb(err) {
	if (err) {
		console.error(err);
	} else {
		console.log('it\'s saved');
	}
}
