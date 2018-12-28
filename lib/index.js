'use strict'

const captchaGenerator = require('./captcha')

class Captcha {
	constructor(params) {
		this.params = params
	}

	image() {
		return (req, res) => {
			const captcha = captchaGenerator.create(this.params)

			// save text:
			if (req.session === undefined) {
				throw Error('node-captcha-express requires express-session')
			}

			req.session[this.params.cookie] = captcha.text

			// send image:
			res.type('svg');
			res.status(200).send(captcha.data);
		}
	}

	math() {
		return (req, res) => {
			const captcha = captchaGenerator.createMathExpr(this.params)

			// save text:
			if (req.session === undefined) {
				throw Error('node-captcha-express requires express-session')
			}

			req.session[this.params.cookie] = captcha.text

			// send image:
			res.type('svg');
			res.status(200).send(captcha.data);
		}
	}

	check(req, text, caseSensitive = true) {
		if (req.session === undefined) {
			throw Error('node-captcha requires express-session')
		}
		const res = caseSensitive ?
			req.session[this.params.cookie] === text :
			req.session[this.params.cookie].toLowerCase() === text.toLowerCase()
		req.session[this.params.cookie] = null
		return res
	}

	loadFont(url) {
		captchaGenerator.loadFont(url)
	}
}

module.exports.create = params => new Captcha(params)
