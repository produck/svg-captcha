const renderer = require('../renderer');

module.exports = class SVGCaptcha {
	constructor({ data, text }, factory) {
		this.$data = data;
		this.$text = text;
		this.$factory = factory;

		this.image = '';
		
		this.render();
	}

	render() {
		return this.image = renderer.draw(this.$text, this.$factory.renderOptions);
	}

	validate(testValue) {
		return this.$factory.$validator(testValue, this.$data);
	}
};



// $renderSectionList(text) {
// 	const preSectionList = [];

// 	const textPathList = Array.from(text).map(char => {
// 		const pathD = renderer.drawChar(char, this.$fontRegistry);

// 		return `<path fill="#666666" d="${pathD}" />`;
// 	});

// 	const postSectionList = [];

// 	return preSectionList.concat(textPathList).concat(postSectionList);
// }
