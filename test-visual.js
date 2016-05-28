const fs = require('fs');
const svg = require('./');

for (var i = 0; i < 10; i++) {
	fs.writeFile(`test${i}.svg`, svg(svg.randomText()), 'utf8', (err) => {
		if (err) console.error(err)
		else console.log('it\'s saved');
	});
}
