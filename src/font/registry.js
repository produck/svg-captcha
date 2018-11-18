const opentype = require('opentype.js');
const path = require('path');
const utils = require('../utils');

const DEFAULT_FONT = opentype.loadSync(path.resolve(__dirname, './assets/Comismsh.ttf'));

function isFont(any) {
	return any instanceof opentype.Font;
}

function DEFAULT_PICKER(fontRegistry) {
	const length = fontRegistry.length;

	return fontRegistry[utils.randomIntegerByRange(0, length - 1)];
}

module.exports = class FontRegistry {
	constructor(initStore = [DEFAULT_FONT]) {
		this.$store = [];

		initStore.forEach(font => this.registerFont(font));
	}

	registerFont(font) {
		if (!isFont(font)) {
			throw new Error('A Font excepted.');
		}

		this.$store.push(font);

		return font;
	}

	pick(picker = DEFAULT_PICKER) {
		const selected = picker(this.$store.slice(0));
		
		if (!isFont(selected)) {
			throw new Error('Invalid picker returns. A Font excepted.');
		}

		return selected;
	}
};