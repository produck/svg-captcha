const Randexp = require('randexp');
const simpleTextRandexp = new Randexp(/[0-9A-Za-z]{4}/);
const FontRegister = require('../../src/font/registry');

module.exports = {
	validator(testData, originData) {
		return testData === originData;
	},
	generator() {
		const text = simpleTextRandexp.gen();

		return {
			text,
			data: text
		};
	},
	renderOptions: {
		font: {
			registry: new FontRegister(),
			colorPicker() {
				return '#000';
			},
			getSize() {
				return 75;
			}
		},
		canvas: {
			background: {
				colorPicker() {
					return '#fff';
				},
				enabled: true
			},
			size: {
				width: 100,
				height: 60
			}
		},
		svg: {
			pathModifier(command) {
				return command;
			},
			getCharOffset(charIndex) {
				return {
					x: 25 * charIndex,
					y: 0
				};
			}
		},
		filter: []
	}
};