const opentype = require('opentype.js');

exports.load = function loadFont(pathname) {
	return new Promise((resolve, reject) => {
		opentype.load(pathname, (err, font) => {
			if (err) {
				return reject(err);
			}

			resolve(font);
		});
	});
}