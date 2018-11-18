const Randexp = require('randexp');
const path = require('path');

// const font = require('./src/font');
const SVGCaptcha = require('./src/captcha/SvgCaptcha');
const svg = require('./src/svg');
const renderer = require('./src/renderer');

const simpleTextRandexp = new Randexp(/[0-9A-Za-z]{4}/);
const DEFAULT_COLOR_LIST = ['#333333', '#666666', '#999999'];

class SVGCaptchaFactory {
	constructor({
		validator = DEFAULT_VALIDATOR,
		generator = DEFAULT_GENERATOR,
		colorList = DEFAULT_COLOR_LIST,
		
		preEffector = [],
		postEffector = [],
		
		fontRegistry = [],
		fontStyle = {

		},
		size = {
			height: 60,
			width: 100
		}
	} = {}) {
		this.$checkGenerator(generator);

		this.$fontRegistry = fontRegistry;
		this.$generator = generator;
		this.$validator = validator;
		this.$colorList = colorList;

		this.$pathHandlerQueue = [];
		this.$effectorQueue = {
			pre: preEffector,
			post: postEffector
		};

		this.$size = size;
	}

	$checkGenerator(fn) {
		const sample = fn();

		if (isString(sample)) {
			return true;
		}

		if (!isObject(sample)) {
			return false;
		}

		const { text, data } = sample;

		if (!isString(text) || data === undefined) {
			return false;
		}
	}

	$generate() {
		const sample = this.$generator();

		if (isString(sample)) {
			return {
				text: sample,
				data: sample
			};
		}

		return sample;
	}

	registerFont(font) {
		return this.$fontRegistry.registerFont(font);
	}

	$renderSectionList(text) {
		const preSectionList = [];

		const textPathList = Array.from(text).map(char => {
			const pathD = renderer.drawChar(char, this.$fontRegistry);

			return `<path fill="#666666" d="${pathD}" />`;
		});

		const postSectionList = [];

		return preSectionList.concat(textPathList).concat(postSectionList);
	}

	createCaptcha() {
		const { text, data } = this.$generate();

		return new SVGCaptcha({
			validator: this.$validator,
			image: svg(Object({
				sectionList: this.$renderSectionList(text)
			}, this.$size)),
			data
		});
	}
}

module.exports = function createSVGCaptchaFactory() {
	return new SVGCaptchaFactory();
};

function isString(any) {
	return typeof any === 'string';
}

function isObject(any) {
	return any instanceof Object;
}

function DEFAULT_GENERATOR() {
	return simpleTextRandexp.gen();
}

function DEFAULT_VALIDATOR(testVal, data) {
	return testVal === data;
}