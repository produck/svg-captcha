const fs = require('fs');
const svg = require('../');

for (let i = 0; i < 10; i++) {
	fs.writeFile(`test${i}.svg`, svg(svg.randomText(), {color: i % 2}), 'utf8', err => {
		if (err) {
			console.error(err);
		} else {
			console.log('it\'s saved');
		}
	});
}

fs.writeFile(`test10.svg`, svg.create({
	size: 3,
	noise: 3,
	color: true,
	background: '#152736'
}).data, 'utf8', err => {
	if (err) {
		console.error(err);
	} else {
		console.log('it\'s saved');
	}
});
