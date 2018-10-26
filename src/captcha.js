module.exports = class SVGCaptcha {
	constructor({
		data,
		image,
		validator
	} = {}) {
		this.$data = data;
		this.$image = image;
		this.$validator = validator;
	}

	get image() {
		return this.$image;
	}

	validate(testValue) {
		return this.$validator.$validator(testValue, this.$data);
	}
}