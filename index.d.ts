/**
 * config captcha generation options
 */
interface ConfigObject {
	/**
	 * default: false
	 * if false, captcha will be black and white
	 * otherwise, it will be randomly colorized
	 */
	color?: boolean,
	/**
	 * default: ''
	 * filter out some characters
	 */
	ignoreChars?: string,
	/**
	 * default: 1
	 * number of noise lines
	 */
	noise?: number,
	/**
	 * default: white
	 * background color of svg image
	 */
	background?: string,
}
/**
 * result of captcha generation
 */
interface CaptchaObj {
	/**
	 * the captcha text,
	 * store this in your session
	 */
	text: string,
	/**
	 * the svg image in string,
	 * set type of image/svg before send to client side
	 */
	data: string
}
/**
 * This method returns a object that has two props:
 * data: svg image string
 * text: captcha text
 */
export function create(options?: ConfigObject): CaptchaObj;
/**
 * This method returns a object that has two props:
 * data: svg image string
 * text: captcha text
 * note that this method generate a math expression
 * this means that text is the result of the math expression
 */
export function createMathExpr(options?: ConfigObject): CaptchaObj;
