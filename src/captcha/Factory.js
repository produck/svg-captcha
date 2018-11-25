const SVGCaptcha = require('./SvgCaptcha');

module.exports = class SVGCaptchaFactory {
	constructor({validator, generator, renderOptions}) {
		checkGenerator(generator);

		this.$generator = generator;
		
		this.$validator = validator;
		this.$renderOptions = renderOptions;
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

	create() {
		return new SVGCaptcha(this.$generate(), this);
	}
};

function isString(any) {
	return typeof any === 'string';
}

function isObject(any) {
	return any instanceof Object;
}

function checkGenerator(fn) {
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